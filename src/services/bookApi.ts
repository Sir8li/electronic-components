// 图书API服务 - 集成多个图书数据源

export interface Book {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  coverUrl?: string;
  publishDate?: string;
  publisher?: string;
  isbn?: string;
  pageCount?: number;
  categories?: string[];
  language?: string;
  source: string;
  link?: string;
}

export interface SearchResult {
  books: Book[];
  total: number;
  source: string;
}

// 1. OpenLibrary API
export async function searchOpenLibrary(query: string): Promise<SearchResult> {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`
    );
    const data = await response.json();
    
    const books: Book[] = data.docs.map((doc: any) => ({
      id: `ol-${doc.key}`,
      title: doc.title,
      authors: doc.author_name || [],
      description: doc.first_sentence?.[0] || '',
      coverUrl: doc.cover_i 
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : undefined,
      publishDate: doc.first_publish_year?.toString(),
      publisher: doc.publisher?.[0],
      isbn: doc.isbn?.[0],
      pageCount: doc.number_of_pages_median,
      language: doc.language?.[0],
      source: 'OpenLibrary',
      link: `https://openlibrary.org${doc.key}`
    }));
    
    return { books, total: data.numFound, source: 'OpenLibrary' };
  } catch (error) {
    console.error('OpenLibrary API error:', error);
    return { books: [], total: 0, source: 'OpenLibrary' };
  }
}

// 2. Gutendex API (Project Gutenberg)
export async function searchGutendex(query: string): Promise<SearchResult> {
  try {
    const response = await fetch(
      `https://gutendex.com/books/?search=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    
    const books: Book[] = data.results.map((book: any) => ({
      id: `gt-${book.id}`,
      title: book.title,
      authors: book.authors.map((a: any) => a.name),
      description: '',
      coverUrl: book.formats['image/jpeg'],
      publishDate: book.authors[0]?.birth_year?.toString(),
      language: book.languages?.[0],
      source: 'Gutendex',
      link: book.formats['text/html'] || book.formats['application/epub+zip']
    }));
    
    return { books, total: data.count, source: 'Gutendex' };
  } catch (error) {
    console.error('Gutendex API error:', error);
    return { books: [], total: 0, source: 'Gutendex' };
  }
}

// 3. Google Books API
export async function searchGoogleBooks(query: string): Promise<SearchResult> {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`
    );
    const data = await response.json();
    
    const books: Book[] = (data.items || []).map((item: any) => ({
      id: `gb-${item.id}`,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      description: item.volumeInfo.description,
      coverUrl: item.volumeInfo.imageLinks?.thumbnail,
      publishDate: item.volumeInfo.publishedDate,
      publisher: item.volumeInfo.publisher,
      isbn: item.volumeInfo.industryIdentifiers?.find((id: any) => 
        id.type === 'ISBN_13' || id.type === 'ISBN_10'
      )?.identifier,
      pageCount: item.volumeInfo.pageCount,
      categories: item.volumeInfo.categories,
      language: item.volumeInfo.language,
      source: 'Google Books',
      link: item.volumeInfo.infoLink
    }));
    
    return { books, total: data.totalItems || 0, source: 'Google Books' };
  } catch (error) {
    console.error('Google Books API error:', error);
    return { books: [], total: 0, source: 'Google Books' };
  }
}

// 4. ISBN.work API (中文图书)
export async function searchISBNWork(query: string): Promise<SearchResult> {
  try {
    const isISBN = /^[0-9]{10,13}$/.test(query.replace(/-/g, ''));
    const searchParam = isISBN ? `isbn=${query}` : `q=${encodeURIComponent(query)}`;
    
    const response = await fetch(
      `https://api.isbn.work/search?${searchParam}&limit=10`
    );
    const data = await response.json();
    
    const books: Book[] = (data.books || []).map((book: any) => ({
      id: `isbn-${book.isbn}`,
      title: book.title,
      authors: book.authors ? [book.authors] : [],
      description: book.summary,
      coverUrl: book.cover,
      publishDate: book.pubdate,
      publisher: book.publisher,
      isbn: book.isbn,
      pageCount: book.pages,
      language: 'zh',
      source: 'ISBN.work',
      link: book.url
    }));
    
    return { books, total: data.total || 0, source: 'ISBN.work' };
  } catch (error) {
    console.error('ISBN.work API error:', error);
    return { books: [], total: 0, source: 'ISBN.work' };
  }
}

// 5. Wikipedia API
export async function searchWikipedia(query: string): Promise<SearchResult> {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );
    
    if (!response.ok) {
      const searchResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
      );
      const searchData = await searchResponse.json();
      
      const books: Book[] = (searchData.query?.search || []).slice(0, 5).map((item: any) => ({
        id: `wiki-${item.pageid}`,
        title: item.title,
        authors: [],
        description: item.snippet.replace(/<[^>]*>/g, ''),
        source: 'Wikipedia',
        link: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`
      }));
      
      return { books, total: searchData.query?.searchinfo?.totalhits || 0, source: 'Wikipedia' };
    }
    
    const data = await response.json();
    const book: Book = {
      id: `wiki-${data.pageid}`,
      title: data.title,
      authors: [],
      description: data.extract,
      coverUrl: data.thumbnail?.source,
      source: 'Wikipedia',
      link: data.content_urls?.desktop?.page
    };
    
    return { books: [book], total: 1, source: 'Wikipedia' };
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return { books: [], total: 0, source: 'Wikipedia' };
  }
}

// 聚合搜索
export async function searchAllBooks(query: string): Promise<SearchResult[]> {
  const results = await Promise.all([
    searchOpenLibrary(query),
    searchGutendex(query),
    searchGoogleBooks(query),
    searchISBNWork(query),
    searchWikipedia(query)
  ]);
  
  return results.filter(r => r.books.length > 0);
}

// 根据ISBN搜索
export async function searchByISBN(isbn: string): Promise<Book | null> {
  const googleResult = await searchGoogleBooks(`isbn:${isbn}`);
  if (googleResult.books.length > 0) return googleResult.books[0];
  
  const isbnResult = await searchISBNWork(isbn);
  if (isbnResult.books.length > 0) return isbnResult.books[0];
  
  const olResult = await searchOpenLibrary(isbn);
  if (olResult.books.length > 0) return olResult.books[0];
  
  return null;
}

export interface User {
  livros: any;
  id: string;
  email: string;
  nome: string;
  imagem?: string;
}

export interface Book {
  id?: string;
  titulo: string;
  autor: string;
  genero: string;
  paginas: number;
  anoLancamento: number;
  imagem?: string | File;
  livros?: Book[];
  userId?: string;
} 
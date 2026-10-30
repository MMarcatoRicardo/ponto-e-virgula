const livros = [
    { titulo: "Dom Casmurro", autor: "Machado de Assis", genero: "Clássico", preco: 29.90, ano: 1899, paginas: 256, capa: "img/livros/dom-casmurro.jpg", sinopse: "Bentinho conta a própria vida e a história do seu amor por Capitu, deixando o leitor com a dúvida mais famosa da literatura brasileira." },
    { titulo: "1984", autor: "George Orwell", genero: "Distopia", preco: 44.90, ano: 1949, paginas: 416, capa: "img/livros/1984.jpg", sinopse: "Winston Smith vive sob o olhar do Grande Irmão, num governo que controla a informação, a linguagem e até o pensamento." },
    { titulo: "O Hobbit", autor: "J.R.R. Tolkien", genero: "Fantasia", preco: 54.90, ano: 1937, paginas: 336, capa: "img/livros/o-hobbit.jpg", sinopse: "Bilbo Bolseiro deixa o conforto da sua toca para ajudar um grupo de anões a recuperar um tesouro guardado por um dragão." },
    { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", genero: "Infantojuvenil", preco: 24.90, ano: 1943, paginas: 96, capa: "img/livros/o-pequeno-principe.jpg", sinopse: "Um aviador perdido no deserto conhece um pequeno príncipe vindo de outro planeta, e aprende com ele o que é essencial." },
    { titulo: "A Hora da Estrela", autor: "Clarice Lispector", genero: "Clássico", preco: 34.90, ano: 1977, paginas: 88, capa: "img/livros/a-hora-da-estrela.jpg", sinopse: "A vida simples de Macabéa, uma jovem nordestina no Rio de Janeiro, contada por um narrador que questiona o próprio ato de escrever." },
    { titulo: "A Revolução dos Bichos", autor: "George Orwell", genero: "Distopia", preco: 32.90, ano: 1945, paginas: 152, capa: "img/livros/a-revolucao-dos-bichos.jpg", sinopse: "Os animais de uma fazenda expulsam os humanos para viver em igualdade, até que alguns começam a ser mais iguais que os outros." },
    { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", genero: "Fantasia", preco: 49.90, ano: 1997, paginas: 264, capa: "img/livros/harry-potter-e-a-pedra-filosofal.jpg", sinopse: "No aniversário de 11 anos, Harry descobre que é um bruxo e é convidado para estudar na Escola de Magia e Bruxaria de Hogwarts." },
    { titulo: "Alice no País das Maravilhas", autor: "Lewis Carroll", genero: "Infantojuvenil", preco: 27.90, ano: 1865, paginas: 160, capa: "img/livros/alice-no-pais-das-maravilhas.jpg", sinopse: "Alice segue um coelho branco, cai numa toca e chega a um mundo onde nada faz sentido e tudo pode acontecer." },
    { titulo: "Torto Arado", autor: "Itamar Vieira Junior", genero: "Contemporâneo", preco: 59.90, ano: 2019, paginas: 264, capa: "img/livros/torto-arado.jpg", sinopse: "Duas irmãs do sertão da Bahia têm a vida marcada por um acidente na infância e pela luta pela terra onde nasceram." },
    { titulo: "Tudo é Rio", autor: "Carla Madeira", genero: "Contemporâneo", preco: 52.90, ano: 2014, paginas: 208, capa: "img/livros/tudo-e-rio.jpg", sinopse: "Dalva, Venâncio e Lucy vivem um triângulo de amor, culpa e perdão contado numa linguagem intensa e poética." },
    { titulo: "A Biblioteca da Meia-Noite", autor: "Matt Haig", genero: "Contemporâneo", preco: 47.90, ano: 2020, paginas: 308, capa: "img/livros/a-biblioteca-da-meia-noite.jpg", sinopse: "Entre a vida e a morte, Nora encontra uma biblioteca onde cada livro mostra uma versão diferente da vida que ela poderia ter vivido." },
    { titulo: "É Assim que Acaba", autor: "Colleen Hoover", genero: "Contemporâneo", preco: 44.90, ano: 2016, paginas: 368, capa: "img/livros/e-assim-que-acaba.jpg", sinopse: "Lily se apaixona por Ryle, mas a relação começa a repetir uma história que ela conhece muito bem da própria família." }
];

function escolherLivro(indice) {
    localStorage.setItem("livroEscolhido", indice);
}

function formatarPreco(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

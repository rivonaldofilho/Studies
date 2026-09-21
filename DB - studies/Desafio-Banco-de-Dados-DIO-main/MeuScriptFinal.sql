--1º Buscar o nome e ano dos filmes
SELECT Nome, Ano FROM Filmes

--2º Buscar o nome e ano dos filmes, ordenados por ordem crescente pelo ano
SELECT Nome, Ano FROM Filmes
ORDER BY Ano 

--3º Buscar pelo filme de volta para o futuro, trazendo o nome, ano e a duração
SELECT * FROM Filmes WHERE Id = 28

--4º Buscar os filmes lançados em 1997
SELECT * FROM Filmes WHERE Ano = 1997
ORDER BY Nome

--5º Buscar os filmes lançados APÓS o ano 2000
SELECT * FROM Filmes WHERE Ano >= 2000
ORDER BY Ano

--6º Buscar os filmes com a duracao maior que 100 e menor que 150, ordenando pela duracao em ordem crescente
SELECT * FROM Filmes WHERE Duracao > 100 AND Duracao < 150
ORDER BY Duracao

--7º Buscar a quantidade de filmes lançadas no ano, agrupando por ano, ordenando pela quantidade em ordem decrescente
SELECT Ano, COUNT(Ano) Quantidade FROM Filmes
WHERE Ano = Ano
GROUP BY Ano
ORDER BY Quantidade DESC

--8º Buscar os Atores do gênero masculino, retornando o PrimeiroNome, UltimoNome
SELECT PrimeiroNome, UltimoNome, Genero FROM Atores
WHERE Genero = 'M'

--9º Buscar os Atores do gênero feminino, retornando o PrimeiroNome, UltimoNome, e ordenando pelo PrimeiroNome
SELECT PrimeiroNome, UltimoNome, Genero FROM Atores
WHERE Genero = 'F'
ORDER BY PrimeiroNome

--10º Buscar o nome do filme e o gênero

SELECT 
	Filmes.Nome,
	Generos.Genero
FROM 
	Filmes
INNER JOIN FilmesGenero ON Filmes.Id = FilmesGenero.IdFilme
INNER JOIN Generos ON FilmesGenero.IdGenero = Generos.Id

WHERE Filmes.Id = IdFilme

--11º Buscar o nome do filme e o gênero do tipo "Mistério"

SELECT 
	Filmes.Nome,
	Generos.Genero
FROM 
	Filmes
INNER JOIN FilmesGenero ON Filmes.Id = FilmesGenero.IdFilme
INNER JOIN Generos ON FilmesGenero.IdGenero = Generos.Id

WHERE Genero = 'Mistério'

--12º Buscar o nome do filme e os atores, trazendo o PrimeiroNome, UltimoNome e seu Papel

SELECT 
	Filmes.Nome,
	Atores.PrimeiroNome,
	Atores.UltimoNome,
	ElencoFilme.Papel
FROM 
	Filmes
INNER JOIN ElencoFilme ON Filmes.Id = IdFilme
INNER JOIN Atores ON ElencoFilme.IdAtor = Atores.Id
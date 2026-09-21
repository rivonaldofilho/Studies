# iPhone UML Diagram

```mermaid
classDiagram
    Iphone <|-- ReprodutorMusical
    Iphone <|-- NavegadorInternet
    Iphone <|-- AparelhoDeChamada
    
    class ReprodutorMusical{
      +selecionarMusica(String musica)
      +tocar()
      +pausar()
    }
    class AparelhoDeChamada{
      +ligar(String numero)
      +atender()
      +iniciarCorreioVoz()
    }
    class NavegadorInternet{
      +exibirPagina(String url)
      +adicionarNovaAba()
      +atualizarPagina()
    }
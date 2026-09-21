using System.Text.RegularExpressions;

namespace DesafioFundamentos.Models
{
    public class Estacionamento
    {
        private decimal precoInicial = 0;
        private decimal precoPorHora = 0;
        private List<string> veiculos = new List<string>();
        private Dictionary<string, DateTime> horasEntrada = new Dictionary<string, DateTime>();

        public Estacionamento(decimal precoInicial, decimal precoPorHora)
        {
            this.precoInicial = precoInicial;
            this.precoPorHora = precoPorHora;
        }

        public void AdicionarVeiculo()
        {
            Console.WriteLine("Digite a placa do veículo para estacionar (formato: ABC-1234):");
            string placa = Console.ReadLine().ToUpper();

            // Validar formato da placa: 3 letras, hífen, 4 números

            if (!ValidarPlaca(placa))
            {
                Console.WriteLine("❌ Placa inválida! Use o formato: ABC-1234 (3 letras, um hífen e 4 números)");
                return;
            }

            // Verificar se placa já existe

            if (!veiculos.Contains(placa))
            {
                veiculos.Add(placa);
                horasEntrada[placa] = DateTime.Now;
                Console.WriteLine($"✓ Veículo {placa} adicionado com sucesso!");
            }
            else
            {
                Console.WriteLine($"❌ O veículo com placa {placa} já está estacionado!");
                return;
            }
        }


        private bool ValidarPlaca(string placa)
        {
            // Padrão: 3 letras, hífen, 4 números (ex: ABC-1234)
            string padrao = @"^[A-Z]{3}-\d{4}$";
            return Regex.IsMatch(placa, padrao);
        }

        public void RemoverVeiculo()
        {
            Console.WriteLine("Digite a placa do veículo para remover (formato: ABC-1234):");
            string placa = Console.ReadLine().ToUpper();
            
            // Validar formato da placa
            if (!ValidarPlaca(placa))
            {
                Console.WriteLine("❌ Placa inválida! Use o formato: ABC-1234");
                return;
            }

            // Verifica se o veículo existe
            if (veiculos.Any(x => x == placa))
            {
                // Calcular horas de permanência
                // 1 hora do programa = 1 minuto do tempo real (multiplicador de 60)
                DateTime entrada = horasEntrada[placa];
                DateTime saida = DateTime.Now;
                TimeSpan tempoDecorrido = saida - entrada;
                int horas = (int)(tempoDecorrido.TotalMinutes * 60);  // Converte minutos em horas simuladas
                
                // Se resultado for 0, considera como 1 hora mínima
                if (horas == 0) horas = 1;
                
                decimal valorTotal = precoInicial + precoPorHora * horas;

                veiculos.Remove(placa);
                horasEntrada.Remove(placa);

                Console.WriteLine($"\n✓ Veículo {placa} removido");
                Console.WriteLine($"Tempo de permanência: {horas} hora(s)");
                Console.WriteLine($"Valor total: R$ {valorTotal:F2}");
            }
            else
            {
                Console.WriteLine("❌ Desculpe, esse veículo não está estacionado aqui. Confira se digitou a placa corretamente");
            }
        }

        public void ListarVeiculos()
        {
            // Verifica se há veículos no estacionamento
            if (veiculos.Any())
            {
                Console.WriteLine("Os veículos estacionados são:\n");
                foreach (string veiculo in veiculos)
                {
                    DateTime entrada = horasEntrada[veiculo];
                    TimeSpan tempoDecorrido = DateTime.Now - entrada;
                    int horasSimuladas = (int)(tempoDecorrido.TotalMinutes * 60);
                    
                    Console.WriteLine($"Placa: {veiculo} | Tempo: {horasSimuladas}h {tempoDecorrido.Minutes}min");
                }
            }
            else
            {
                Console.WriteLine("Não há veículos estacionados.");
            }
        }
    }
}

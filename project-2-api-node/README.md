# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar carros disponívis pela marca.
Deve ser possível listar carros disponívis pela categoria.
Deve ser possível listar carros disponívis nome do carro.

**RN**
 O usário não precisa estar logado no sistema.

# Cada de Especificação no carro 

**RF**
Deve ser possível cadastrar uma especificação para um carro
Deve ser possíbel listar todas as especificações.
Deve ser possível listar todos os carros.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não dever ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador. 

# Cadastro de imagem do carro

**RF**
Deve ser possível cadastrar a imagem do carro.
Deve ser possível listar todos os carros.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário responsável pelo cadastro deve ser um usuário administrador. 
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

# Aluguel de carro

**RF**
Deve ser possível registrar um aluguel

**RN**
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

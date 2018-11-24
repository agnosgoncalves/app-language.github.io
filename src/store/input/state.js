import { required, email, minLength, maxLength, sameAs, numeric, maxValue, minValue } from 'vuelidate/lib/validators'
export default {
  validations: {
    cpf: { required, numeric, minLength: minLength(11), maxLength: maxLength(11) },
    name: { minLength: minLength(3) },
    age: { numeric, maxValue: maxValue(100) },
    lngsCheck: { required },
    email: { required, email, minLength: minLength(8) },
    password: { required, minLength: minLength(8) },
    repeatPassword: { required, minLength: minLength(8), sameAsPassword: sameAs('password') },
    account: {required, numeric, minLength: minLength(4), maxLength: maxLength(6)},
    account_number: {numeric, minLength: minLength(1), maxLength: maxLength(1)},
    agency: {required, numeric, minLength: minLength(4), maxLength: maxLength(4)},
    agency_number: {numeric, minLength: minLength(1), maxLength: maxLength(1)},
    name_banker: {minLength: minLength(3)},
    pointsBuy: { required, numeric, maxValue: maxValue(115) },
    amountPoints: { required, numeric },
    time_experience: { numeric, maxValue: maxValue(100), minValue: minValue(1) }
  },
  labels: {
    cpf: 'CPF',
    name: 'Nome',
    age: 'Idade',
    email: 'Email',
    password: 'Senha',
    repeatPassword: 'Repita a senha',
    lngsCheck: 'Idiomas ativos',
    name_banker: 'Nome do banco',
    account: 'Conta',
    account_number: 'Número da conta',
    agency: 'Agência',
    agency_number: 'Número da agência',
    pointsBuy: 'Pontos',
    amountPoints: 'Preço total',
    time_experience: 'Tempo de experiencia',
    btn: {
      createAccount: 'Criar conta',
      editAccount: 'Editar conta',
      buy: 'Comprar',
      updateData: 'Atualizar dados',
      login: 'Entrar'
    },
    form: {
      error: {
        general: 'Preencha os campos corretamente',
        hasEmail: 'Email já cadastrado',
        notEmail: 'Usuário não cadastrado',
        pointsBuyNotSelected: 'Por favor selecione ao menos um pacote'
      },
      success: {
        general: 'Dados atualizados com sucesso',
        purchase: 'Compra realizada com sucesso'
      }
    }
  },
  helpers: {
    name: '',
    age: '',
    email: 'Seu email é seu identificador principal',
    password: 'Adicione uma senha que vá se lembrar posteriormente',
    repeatPassword: 'Confirme a senha inserida',
    lngsCheck: 'Os idiomas ativos definem o tipo de aula que o sistema buscara para você',
    pointsBuy: 'Pontos a serem adicionados a conta',
    amountPoints: 'Custo total em dinheiro',
    time_experience: 'Tempo de atuação como professor'
  },
  messages: {
    errors: {
      required: 'Campo obrigatório',
      minLength: 'Minimo de caracteres',
      maxLength: 'Máximo de caracteres',
      sameAsPassword: 'Campo precisa ser igual a',
      email: 'Email com formato invalido',
      numeric: 'Apens valores numéricos',
      maxValue: 'Valor maximo',
      minValue: 'Valor minimo'
    }
  }
}

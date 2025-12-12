import { Pet, Service, Tutor } from "./types";

// CPFs Gatilhos
export const CPF_NORMAL = "111.111.111-11";
export const CPF_MULTI_PET = "222.222.222-22";
export const CPF_NO_PLAN = "333.333.333-33";
export const CPF_DELINQUENT = "444.444.444-44";
export const CPF_SAVED_BUDGET = "555.555.555-55";
export const CPF_ATTENDANCE = "666.666.666-66";

export const MOCK_TUTOR: Tutor = {
  name: "Karina Almeida dos Santos",
  phone: "(11) 98765-4321",
  cpf: "123.456.789-01"
};

// Cenário com múltiplos pets
export const MOCK_PETS_LIST: Pet[] = [
  {
    id: "pet-1",
    name: "Nome do Pet",
    type: "Gato",
    breed: "Siamês",
    gender: "Fêmea",
    birthDate: "30/06/2018",
    age: "04 anos",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    weight: "4.5kg",
    plan: "Plano Conforto",
    hasAppointment: true,
    appointmentInfo: "14/02/2024 - 14:30\nWeVets - Unidade Jardins\n3 serviço(s) - R$ 350.00"
  },
  {
    id: "pet-2",
    name: "Nome do Pet",
    type: "Gato",
    breed: "Siamês",
    gender: "Fêmea",
    birthDate: "15/05/2020",
    age: "02 anos",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    weight: "3.2kg",
    plan: "Plano Conforto",
    hasAppointment: false
  }
];

// Pet padrão para cenário normal/inadimplente
export const MOCK_PET: Pet = MOCK_PETS_LIST[0];

// Dados do Orçamento Salvo (Mock)
export const MOCK_BUDGET_ITEMS = [
  { name: "Consulta clínica geral", price: 50.00 },
  { name: "Hemograma completo", price: 50.00 },
  { name: "Vacina antirrábica", price: 50.00 }
];

export const PLANS = [
  {
    name: "Plano Básico",
    price: "499,00",
    features: [
      "Vacinas Obrigatórias",
      "Consultas em Horário Comercial",
      "Consultas em Horário de Plantão",
      "Exames Laboratoriais de Check Up",
      "Hospitais Premium WeVets 24h"
    ]
  },
  {
    name: "Plano Conforto",
    price: "499,00",
    baseFeatures: "Tudo do plano Básico e mais:",
    features: [
      "Exames Laboratoriais Complexos",
      "Exames de Imagem",
      "Hospitais Premium WeVets 24h"
    ]
  },
  {
    name: "Plano Super",
    price: "499,00",
    baseFeatures: "Tudo do plano Básico e mais:",
    features: [
      "Exames Laboratoriais Complexos",
      "Exames de Imagem",
      "Hospitais Premium WeVets 24h"
    ]
  },
  {
    name: "Plano Ultra",
    price: "499,00",
    baseFeatures: "Tudo do plano Básico e mais:",
    features: [
      "Exames Laboratoriais Complexos",
      "Exames de Imagem",
      "Hospitais Premium WeVets 24h"
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: "1",
    code: "cód 004",
    name: "Consulta clínica geral",
    category: "Consulta",
    price: 150.00,
    copay: 50.00,
    actionType: 'cart',
    tags: [
      { label: "Carência", type: "success", icon: "check" },
      { label: "Limite", type: "success", icon: "check" },
      { label: "Cobertura", type: "success", icon: "check" },
    ]
  },
  {
    id: "2",
    code: "cód 004",
    name: "Consulta Plantão",
    category: "Consulta",
    price: 200.00,
    copay: 70.00,
    actionType: 'cart',
    warning: "Consulta feita recentemente. Intervalo de 07 dias.",
    tags: [
      { label: "Carência", type: "success", icon: "check" },
      { label: "Limite", type: "success", icon: "check" },
      { label: "Cobertura", type: "success", icon: "check" },
    ]
  },
  {
    id: "3",
    code: "cód 004",
    name: "Consulta especializada - Dermatologia",
    category: "Consulta",
    price: 180.00,
    copay: 60.00,
    actionType: 'cart',
    tags: [
      { label: "Carência de 60 dias", type: "error", icon: "x" },
      { label: "Limite", type: "success", icon: "check" },
      { label: "Cobertura", type: "success", icon: "check" },
    ]
  },
  {
    id: "4",
    code: "cód 004",
    name: "Consulta especializada - Cardiologia",
    category: "Consulta",
    price: 180.00,
    copay: 60.00,
    actionType: 'cart',
    disabled: true,
    tags: [
      { label: "Carência", type: "success", icon: "check" },
      { label: "Limite atingido", type: "error", icon: "x" },
      { label: "Cobertura", type: "success", icon: "check" },
    ]
  },
  {
    id: "5",
    code: "cód 004",
    name: "Vacina V8 (Cães)",
    category: "Vacina",
    price: 100.00,
    copay: 50.00,
    actionType: 'cart',
    tags: [
      { label: "Carência", type: "success", icon: "check" },
      { label: "Limite", type: "success", icon: "check" },
    ]
  },
  {
    id: "6",
    code: "cód 004",
    name: "Hemograma completo",
    category: "Exame",
    price: 80.00,
    copay: 50.00,
    actionType: 'cart',
    tags: [
      { label: "Carência", type: "success", icon: "check" },
      { label: "Limite", type: "success", icon: "check" },
      { label: "Cobertura", type: "success", icon: "check" },
    ]
  },
  {
    id: "7",
    code: "cód 004",
    name: "Endoscopia",
    category: "Exame",
    price: 550.00,
    copay: 0,
    actionType: 'forward',
    disabled: true,
    tags: [
      { label: "Serviço indisponível", type: "error", icon: "x" }
    ]
  },
  {
    id: "8",
    code: "cód 005",
    name: "Ressonância Magnética",
    category: "Exame",
    price: 800.00,
    copay: 0,
    actionType: 'none',
    disabled: true,
    tags: [
      { label: "Serviço indisponível", type: "error", icon: "x" }
    ]
  },
  {
    id: "9",
    code: "cód 004",
    name: "Consulta especializada - Ortopedia",
    category: "Consulta",
    price: 180.00,
    copay: 24.00,
    actionType: 'upgrade',
    disabled: true,
    warning: "Serviço disponível para o plano Super",
    tags: [
      { label: "Carência", type: "success", icon: "check" },
      { label: "Limite", type: "success", icon: "check" },
      { label: "Sem cobertura", type: "error", icon: "x" },
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Todos', count: 4 }, // Count visual only
  { id: 'consultas', label: 'Consultas', count: 5 },
  { id: 'vacinas', label: 'Vacinas', count: 0 },
  { id: 'exames', label: 'Exames', count: 2 },
  { id: 'cirurgias', label: 'Cirurgias', count: 0 },
  { id: 'internacao', label: 'Internação', count: 0 },
];

export interface Service {
  id: string;
  code: string;
  name: string;
  category: 'Consulta' | 'Vacina' | 'Exame' | 'Cirurgia' | 'Internação';
  price: number;
  copay: number;
  tags: {
    label: string;
    type: 'success' | 'warning' | 'error' | 'neutral';
    icon?: 'check' | 'x' | 'clock';
  }[];
  warning?: string;
  disabled?: boolean;
  actionType: 'cart' | 'forward' | 'none' | 'upgrade'; // 'upgrade' offers plan change
}

export interface CartItem extends Service {
  quantity: number;
  anticipationFee?: number; // Valor da antecipação de carência, se houver
  limitFee?: number; // Valor da compra de limite, se houver
}

export interface Pet {
  id: string; // Added ID for selection
  name: string;
  type: string;
  breed: string;
  gender: string;
  birthDate: string;
  age: string;
  weight?: string;
  image: string;
  plan?: string; // Added for the UI card
  hasAppointment?: boolean; // For the badge
  appointmentInfo?: string; // Detail line
}

export interface Tutor {
  name: string;
  phone: string;
  cpf: string;
}

export type ModalType = 'none' | 'finalize' | 'schedule' | 'details' | 'search' | 'petSelection' | 'budgetDetails' | 'anamnesis' | 'gracePeriod' | 'confirmBudget' | 'limitExceeded' | 'noCoverage' | 'serviceDetails' | 'cancelAttendance' | 'updateWeight' | 'tutorInfo' | 'upgradePlan';

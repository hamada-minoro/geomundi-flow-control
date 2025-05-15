
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
  uploadedBy: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  assignedTo: User;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  documents: Document[];
  comments: Comment[];
  startedAt?: Date;
  completedAt?: Date;
}

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  createdBy: User;
}

export interface Process {
  id: string;
  title: string;
  description: string;
  type: 'purchase' | 'hiring' | 'other';
  status: 'draft' | 'ongoing' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  createdBy: User;
  currentStep: number;
  steps: ProcessStep[];
  documents: Document[];
}

export interface Notification {
  id: string;
  type: 'process_assigned' | 'process_completed' | 'comment_added' | 'document_added';
  read: boolean;
  message: string;
  processId?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalProcesses: number;
  ongoingProcesses: number;
  completedProcesses: number;
  cancelledProcesses: number;
  assignedToMe: number;
  createdByMe: number;
  highPriorityCount: number;
  processesByType: {
    type: string;
    count: number;
  }[];
  processesByStatus: {
    status: string;
    count: number;
  }[];
  recentProcesses: Process[];
}

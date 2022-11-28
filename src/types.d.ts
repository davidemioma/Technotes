export interface UserProps {
  _id: string;
  username: string;
  active: boolean;
  roles: string[];
}

export interface NoteProps {
  _id: string;
  user: string;
  username: string;
  completed: boolean;
  title: string;
  text: string;
  ticket: number;
  updatedAt: string;
  createdAt: string;
}

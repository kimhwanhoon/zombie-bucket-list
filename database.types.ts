export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bucketList: {
        Row: {
          categories: Json | null;
          content: string | null;
          created_at: string;
          id: number;
          photoURL: string | null;
          status: string | null;
          title: string | null;
          userId: string | null;
          uuid: string | null;
          writer: string | null;
        };
        Insert: {
          categories?: Json | null;
          content?: string | null;
          created_at: string;
          id?: number;
          photoURL?: string | null;
          status?: string | null;
          title?: string | null;
          userId?: string | null;
          uuid?: string | null;
          writer?: string | null;
        };
        Update: {
          categories?: Json | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          photoURL?: string | null;
          status?: string | null;
          title?: string | null;
          userId?: string | null;
          uuid?: string | null;
          writer?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          about: string | null;
          email: string | null;
          id: string;
          nickname: string | null;
          password: string | null;
          profileImage: string | null;
          signupDate: string | null;
        };
        Insert: {
          about?: string | null;
          email?: string | null;
          id?: string;
          nickname?: string | null;
          password?: string | null;
          profileImage?: string | null;
          signupDate?: string | null;
        };
        Update: {
          about?: string | null;
          email?: string | null;
          id?: string;
          nickname?: string | null;
          password?: string | null;
          profileImage?: string | null;
          signupDate?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

/*
  # Crear tabla de resultados de trivia

  1. Nueva Tabla
    - `trivia_results`
      - `id` (uuid, clave primaria)
      - `user_id` (uuid, referencia a auth.users)
      - `instagram_handle` (texto)
      - `score` (entero)
      - `total_questions` (entero)
      - `percentage` (decimal)
      - `created_at` (timestamp)

  2. Seguridad
    - Habilitar RLS en la tabla
    - Agregar políticas para:
      - Usuarios autenticados pueden ver sus propios resultados
      - Administradores pueden ver todos los resultados
*/

CREATE TABLE IF NOT EXISTS trivia_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  instagram_handle text NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  percentage decimal NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trivia_results ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios vean sus propios resultados
CREATE POLICY "Users can view own results"
  ON trivia_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Política para que los usuarios puedan insertar sus resultados
CREATE POLICY "Users can insert own results"
  ON trivia_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
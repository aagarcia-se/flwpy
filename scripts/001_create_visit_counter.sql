-- Tabla para el contador de visitas
CREATE TABLE IF NOT EXISTS visit_counter (
  id INTEGER PRIMARY KEY DEFAULT 1,
  count INTEGER NOT NULL DEFAULT 0,
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar registro inicial si no existe
INSERT INTO visit_counter (id, count) 
VALUES (1, 0) 
ON CONFLICT (id) DO NOTHING;

-- Habilitar RLS
ALTER TABLE visit_counter ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (todos pueden ver el contador)
CREATE POLICY "Allow public read" ON visit_counter 
  FOR SELECT USING (true);

-- Política para permitir actualización pública (incrementar contador)
CREATE POLICY "Allow public update" ON visit_counter 
  FOR UPDATE USING (true);

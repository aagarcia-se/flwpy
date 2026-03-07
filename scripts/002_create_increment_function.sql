-- Crear función RPC para incrementar el contador de visitas de forma atómica
CREATE OR REPLACE FUNCTION increment_visit_counter()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  -- Incrementar el contador y devolver el nuevo valor
  UPDATE visit_counter 
  SET count = count + 1, 
      last_visit = NOW()
  WHERE id = 1
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$;

-- Dar permisos para ejecutar la función
GRANT EXECUTE ON FUNCTION increment_visit_counter() TO anon;
GRANT EXECUTE ON FUNCTION increment_visit_counter() TO authenticated;

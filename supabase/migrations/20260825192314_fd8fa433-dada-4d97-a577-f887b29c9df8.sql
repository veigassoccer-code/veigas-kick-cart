ALTER TABLE public.produtos ADD COLUMN imagens JSONB NOT NULL DEFAULT '[]'::jsonb;

UPDATE public.produtos SET imagens = jsonb_build_array(imagem_url);

UPDATE public.produtos SET nome = nome || ' Campo' WHERE categoria = 'campo' AND nome NOT ILIKE '%campo%';

ALTER TABLE public.produtos DROP COLUMN marca;
ALTER TABLE public.produtos DROP COLUMN categoria;
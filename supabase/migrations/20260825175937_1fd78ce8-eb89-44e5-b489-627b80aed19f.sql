CREATE TABLE public.produtos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  marca TEXT NOT NULL,
  categoria TEXT NOT NULL,
  preco NUMERIC(10,2) NOT NULL,
  imagem_url TEXT NOT NULL,
  destaque BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.produtos TO anon;
GRANT SELECT ON public.produtos TO authenticated;
GRANT ALL ON public.produtos TO service_role;
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Produtos são públicos para leitura" ON public.produtos FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.variacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID NOT NULL REFERENCES public.produtos(id) ON DELETE CASCADE,
  tamanho INTEGER NOT NULL,
  estoque INTEGER NOT NULL DEFAULT 0,
  link_yampi TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (produto_id, tamanho)
);
GRANT SELECT ON public.variacoes TO anon;
GRANT SELECT ON public.variacoes TO authenticated;
GRANT ALL ON public.variacoes TO service_role;
ALTER TABLE public.variacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Variações são públicas para leitura" ON public.variacoes FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.produtos (id, nome, marca, categoria, preco, imagem_url, destaque) VALUES
  ('11111111-1111-4111-8111-111111111111','Nike Mercurial Superfly Pro FG','Nike','campo',899.90,'/images/products/chuteira-vermelha-pro.jpg',true),
  ('22222222-2222-4222-8222-222222222222','Nike Phantom Elite FG','Nike','campo',849.90,'/images/products/chuteira-branca-elite.jpg',false),
  ('33333333-3333-4333-8333-333333333333','Adidas Predator Control FG','Adidas','campo',949.90,'/images/products/chuteira-preta-control.jpg',true),
  ('44444444-4444-4444-8444-444444444444','Adidas Speed X FG','Adidas','campo',799.90,'/images/products/chuteira-azul-speed.jpg',false),
  ('55555555-5555-4555-8555-555555555555','Puma Future Knit FG','Puma','campo',749.90,'/images/products/chuteira-laranja-future.jpg',true),
  ('66666666-6666-4666-8666-666666666666','Mizuno Morelia Classic FG','Mizuno','campo',699.90,'/images/products/chuteira-couro-classic.jpg',false),
  ('77777777-7777-4777-8777-777777777777','Nike Gato Pro Futsal','Nike','futsal',519.90,'/images/products/futsal-vermelha-pro.jpg',true),
  ('88888888-8888-4888-8888-888888888888','Joma Top Flex Futsal','Joma','futsal',419.90,'/images/products/futsal-top-flex.jpg',false),
  ('99999999-9999-4999-8999-999999999999','Adidas Mundial Society','Adidas','society',549.90,'/images/products/society-preta-turf.jpg',true),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa','Puma King Gold Society','Puma','society',499.90,'/images/products/society-dourada-king.jpg',false);

INSERT INTO public.variacoes (produto_id, tamanho, estoque, link_yampi)
SELECT p.id, s.tamanho,
  CASE WHEN (s.tamanho + p.off) % 4 = 0 THEN 0 ELSE ((s.tamanho * 3 + p.off) % 8) + 2 END,
  'https://pay.yampi.com.br/r/' || p.slug || '-' || s.tamanho
FROM (VALUES
  ('11111111-1111-4111-8111-111111111111'::uuid, 'nike-mercurial-superfly-pro', 1),
  ('22222222-2222-4222-8222-222222222222'::uuid, 'nike-phantom-elite', 2),
  ('33333333-3333-4333-8333-333333333333'::uuid, 'adidas-predator-control', 3),
  ('44444444-4444-4444-8444-444444444444'::uuid, 'adidas-speed-x', 0),
  ('55555555-5555-4555-8555-555555555555'::uuid, 'puma-future-knit', 1),
  ('66666666-6666-4666-8666-666666666666'::uuid, 'mizuno-morelia-classic', 2),
  ('77777777-7777-4777-8777-777777777777'::uuid, 'nike-gato-pro', 3),
  ('88888888-8888-4888-8888-888888888888'::uuid, 'joma-top-flex', 0),
  ('99999999-9999-4999-8999-999999999999'::uuid, 'adidas-mundial-society', 1),
  ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'::uuid, 'puma-king-gold-society', 2)
) AS p(id, slug, off)
CROSS JOIN generate_series(38, 42) AS s(tamanho);
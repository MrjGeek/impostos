--
-- PostgreSQL database dump
--



-- Started on 2018-08-19 16:15:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2171 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 184 (class 1259 OID 16516)
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    idcategorias integer NOT NULL,
    nome text
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- TOC entry 183 (class 1259 OID 16514)
-- Name: categorias_idcategorias_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_idcategorias_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categorias_idcategorias_seq OWNER TO postgres;

--
-- TOC entry 2172 (class 0 OID 0)
-- Dependencies: 183
-- Name: categorias_idcategorias_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_idcategorias_seq OWNED BY public.categorias.idcategorias;


--
-- TOC entry 182 (class 1259 OID 16505)
-- Name: impostos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.impostos (
    idimpostos integer NOT NULL,
    nome text,
    porcentagem numeric(20,2)
);


ALTER TABLE public.impostos OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 16503)
-- Name: impostos_idimpostos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.impostos_idimpostos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.impostos_idimpostos_seq OWNER TO postgres;

--
-- TOC entry 2173 (class 0 OID 0)
-- Dependencies: 181
-- Name: impostos_idimpostos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.impostos_idimpostos_seq OWNED BY public.impostos.idimpostos;


--
-- TOC entry 186 (class 1259 OID 16527)
-- Name: impostoscategoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.impostoscategoria (
    idimpostoscategoria integer NOT NULL,
    categorias_idcategorias integer,
    impostos_idimpostos integer
);


ALTER TABLE public.impostoscategoria OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 16525)
-- Name: impostoscategoria_idimpostoscategoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.impostoscategoria_idimpostoscategoria_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.impostoscategoria_idimpostoscategoria_seq OWNER TO postgres;

--
-- TOC entry 2174 (class 0 OID 0)
-- Dependencies: 185
-- Name: impostoscategoria_idimpostoscategoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.impostoscategoria_idimpostoscategoria_seq OWNED BY public.impostoscategoria.idimpostoscategoria;


--
-- TOC entry 188 (class 1259 OID 16545)
-- Name: produtos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produtos (
    idprodutos integer NOT NULL,
    categorias_idcategorias integer,
    nome text,
    valor numeric(20,2),
    valorsemimposto numeric(20,2)
);


ALTER TABLE public.produtos OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 16543)
-- Name: produtos_idprodutos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produtos_idprodutos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produtos_idprodutos_seq OWNER TO postgres;

--
-- TOC entry 2175 (class 0 OID 0)
-- Dependencies: 187
-- Name: produtos_idprodutos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produtos_idprodutos_seq OWNED BY public.produtos.idprodutos;


--
-- TOC entry 190 (class 1259 OID 16561)
-- Name: vendas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendas (
    idvendas integer NOT NULL,
    valorsemimposto numeric(20,2),
    valor numeric(20,2),
    recebido numeric(20,2),
    troco numeric(20,2)
);


ALTER TABLE public.vendas OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 16559)
-- Name: vendas_idvendas_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendas_idvendas_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendas_idvendas_seq OWNER TO postgres;

--
-- TOC entry 2176 (class 0 OID 0)
-- Dependencies: 189
-- Name: vendas_idvendas_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendas_idvendas_seq OWNED BY public.vendas.idvendas;


--
-- TOC entry 192 (class 1259 OID 16569)
-- Name: vendasprodutos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendasprodutos (
    idvendasprodutos integer NOT NULL,
    vendas_idvendas integer,
    produtos_idprodutos integer,
    total numeric(20,2),
    totalsemimposto numeric(20,2),
    quantidade numeric(20,2)
);


ALTER TABLE public.vendasprodutos OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 16567)
-- Name: vendasprodutos_idvendasprodutos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendasprodutos_idvendasprodutos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendasprodutos_idvendasprodutos_seq OWNER TO postgres;

--
-- TOC entry 2177 (class 0 OID 0)
-- Dependencies: 191
-- Name: vendasprodutos_idvendasprodutos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendasprodutos_idvendasprodutos_seq OWNED BY public.vendasprodutos.idvendasprodutos;


--
-- TOC entry 2015 (class 2604 OID 16519)
-- Name: idcategorias; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN idcategorias SET DEFAULT nextval('public.categorias_idcategorias_seq'::regclass);


--
-- TOC entry 2014 (class 2604 OID 16508)
-- Name: idimpostos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impostos ALTER COLUMN idimpostos SET DEFAULT nextval('public.impostos_idimpostos_seq'::regclass);


--
-- TOC entry 2016 (class 2604 OID 16530)
-- Name: idimpostoscategoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impostoscategoria ALTER COLUMN idimpostoscategoria SET DEFAULT nextval('public.impostoscategoria_idimpostoscategoria_seq'::regclass);


--
-- TOC entry 2017 (class 2604 OID 16548)
-- Name: idprodutos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos ALTER COLUMN idprodutos SET DEFAULT nextval('public.produtos_idprodutos_seq'::regclass);


--
-- TOC entry 2018 (class 2604 OID 16564)
-- Name: idvendas; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendas ALTER COLUMN idvendas SET DEFAULT nextval('public.vendas_idvendas_seq'::regclass);


--
-- TOC entry 2019 (class 2604 OID 16572)
-- Name: idvendasprodutos; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendasprodutos ALTER COLUMN idvendasprodutos SET DEFAULT nextval('public.vendasprodutos_idvendasprodutos_seq'::regclass);


--
-- TOC entry 2154 (class 0 OID 16516)
-- Dependencies: 184
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (idcategorias, nome) FROM stdin;
\.


--
-- TOC entry 2178 (class 0 OID 0)
-- Dependencies: 183
-- Name: categorias_idcategorias_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_idcategorias_seq', 1, false);


--
-- TOC entry 2152 (class 0 OID 16505)
-- Dependencies: 182
-- Data for Name: impostos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.impostos (idimpostos, nome, porcentagem) FROM stdin;
\.


--
-- TOC entry 2179 (class 0 OID 0)
-- Dependencies: 181
-- Name: impostos_idimpostos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.impostos_idimpostos_seq', 1, false);


--
-- TOC entry 2156 (class 0 OID 16527)
-- Dependencies: 186
-- Data for Name: impostoscategoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.impostoscategoria (idimpostoscategoria, categorias_idcategorias, impostos_idimpostos) FROM stdin;
\.


--
-- TOC entry 2180 (class 0 OID 0)
-- Dependencies: 185
-- Name: impostoscategoria_idimpostoscategoria_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.impostoscategoria_idimpostoscategoria_seq', 1, false);


--
-- TOC entry 2158 (class 0 OID 16545)
-- Dependencies: 188
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.produtos (idprodutos, categorias_idcategorias, nome, valor, valorsemimposto) FROM stdin;
\.


--
-- TOC entry 2181 (class 0 OID 0)
-- Dependencies: 187
-- Name: produtos_idprodutos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produtos_idprodutos_seq', 1, false);


--
-- TOC entry 2160 (class 0 OID 16561)
-- Dependencies: 190
-- Data for Name: vendas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendas (idvendas, valorsemimposto, valor, recebido, troco) FROM stdin;
\.


--
-- TOC entry 2182 (class 0 OID 0)
-- Dependencies: 189
-- Name: vendas_idvendas_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendas_idvendas_seq', 1, false);


--
-- TOC entry 2162 (class 0 OID 16569)
-- Dependencies: 192
-- Data for Name: vendasprodutos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vendasprodutos (idvendasprodutos, vendas_idvendas, produtos_idprodutos, total, totalsemimposto, quantidade) FROM stdin;
\.


--
-- TOC entry 2183 (class 0 OID 0)
-- Dependencies: 191
-- Name: vendasprodutos_idvendasprodutos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendasprodutos_idvendasprodutos_seq', 1, false);


--
-- TOC entry 2023 (class 2606 OID 16524)
-- Name: categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (idcategorias);


--
-- TOC entry 2021 (class 2606 OID 16513)
-- Name: impostos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impostos
    ADD CONSTRAINT impostos_pkey PRIMARY KEY (idimpostos);


--
-- TOC entry 2025 (class 2606 OID 16532)
-- Name: impostoscategoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impostoscategoria
    ADD CONSTRAINT impostoscategoria_pkey PRIMARY KEY (idimpostoscategoria);


--
-- TOC entry 2027 (class 2606 OID 16553)
-- Name: produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (idprodutos);


--
-- TOC entry 2029 (class 2606 OID 16566)
-- Name: vendas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendas
    ADD CONSTRAINT vendas_pkey PRIMARY KEY (idvendas);


--
-- TOC entry 2031 (class 2606 OID 16574)
-- Name: vendasprodutos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendasprodutos
    ADD CONSTRAINT vendasprodutos_pkey PRIMARY KEY (idvendasprodutos);


--
-- TOC entry 2032 (class 2606 OID 16533)
-- Name: impostoscategoria_categorias_idcategorias_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impostoscategoria
    ADD CONSTRAINT impostoscategoria_categorias_idcategorias_fkey FOREIGN KEY (categorias_idcategorias) REFERENCES public.categorias(idcategorias);


--
-- TOC entry 2033 (class 2606 OID 16538)
-- Name: impostoscategoria_impostos_idimpostos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impostoscategoria
    ADD CONSTRAINT impostoscategoria_impostos_idimpostos_fkey FOREIGN KEY (impostos_idimpostos) REFERENCES public.impostos(idimpostos);


--
-- TOC entry 2034 (class 2606 OID 16554)
-- Name: produtos_categorias_idcategorias_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_categorias_idcategorias_fkey FOREIGN KEY (categorias_idcategorias) REFERENCES public.categorias(idcategorias);


--
-- TOC entry 2036 (class 2606 OID 16580)
-- Name: vendasprodutos_produtos_idprodutos_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendasprodutos
    ADD CONSTRAINT vendasprodutos_produtos_idprodutos_fkey FOREIGN KEY (produtos_idprodutos) REFERENCES public.produtos(idprodutos);


--
-- TOC entry 2035 (class 2606 OID 16575)
-- Name: vendasprodutos_vendas_idvendas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendasprodutos
    ADD CONSTRAINT vendasprodutos_vendas_idvendas_fkey FOREIGN KEY (vendas_idvendas) REFERENCES public.vendas(idvendas);


--
-- TOC entry 2170 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-08-19 16:15:46

--
-- PostgreSQL database dump complete
--


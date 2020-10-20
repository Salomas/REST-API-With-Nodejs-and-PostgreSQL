-- Table: public.cities
CREATE TABLE public.cities
(
    city_id integer NOT NULL DEFAULT nextval('cities_city_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    lon double precision NOT NULL,
    lat double precision NOT NULL,
    country character varying(255) COLLATE pg_catalog."default" NOT NULL,
    population integer NOT NULL,
    timezone integer NOT NULL,
    CONSTRAINT cities_pkey PRIMARY KEY (city_id)
)

TABLESPACE pg_default;

ALTER TABLE public.cities
    OWNER to postgres;

-- Table: public.forecasts

CREATE TABLE public.forecasts
(
    forecasts_id integer NOT NULL DEFAULT nextval('forecasts_forecasts_id_seq'::regclass),
    city_id integer,
    weather_id integer,
    dt integer NOT NULL,
    sunrise integer NOT NULL,
    sunset integer NOT NULL,
    tempday double precision NOT NULL,
    tempmin double precision NOT NULL,
    tempmax double precision NOT NULL,
    tempnight double precision NOT NULL,
    tempeve double precision NOT NULL,
    tempmorn double precision NOT NULL,
    feels_likeday double precision NOT NULL,
    feels_likenight double precision NOT NULL,
    feels_likeeve double precision NOT NULL,
    feels_likemorn double precision NOT NULL,
    pressure double precision NOT NULL,
    humidity integer NOT NULL,
    speed double precision NOT NULL,
    deg integer NOT NULL,
    clouds integer NOT NULL,
    pop double precision NOT NULL,
    CONSTRAINT forecasts_pkey PRIMARY KEY (forecasts_id),
    CONSTRAINT forecasts_city_id_fkey FOREIGN KEY (city_id)
        REFERENCES public.cities (city_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT forecasts_weather_id_fkey FOREIGN KEY (weather_id)
        REFERENCES public.weather (weather_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.forecasts
    OWNER to postgres;

-- Table: public.weather
CREATE TABLE public.weather
(
    weather_id integer NOT NULL DEFAULT nextval('weather_weather_id_seq'::regclass),
    main character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(255) COLLATE pg_catalog."default" NOT NULL,
    icon character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT weather_pkey PRIMARY KEY (weather_id)
)

TABLESPACE pg_default;

ALTER TABLE public.weather
    OWNER to postgres;


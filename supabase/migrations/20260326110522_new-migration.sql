CREATE TABLE public."Trip" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  title character varying,
  description character varying,
  start_date timestamp without time zone,
  end_date timestamp without time zone,
  budget_target bigint,
  budget_max bigint,
  user_id uuid,
  expenses bigint,
  CONSTRAINT "Trip_pkey" PRIMARY KEY (id),
  CONSTRAINT "Trip_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

ALTER TABLE public."Trip" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own trips"
ON public."Trip"
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.favorites (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  trip_id bigint NOT NULL,
  CONSTRAINT favorites_pkey PRIMARY KEY (id),
  CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT favorites_trip_id_fkey FOREIGN KEY (trip_id) REFERENCES public."Trip"(id) ON DELETE CASCADE,
  CONSTRAINT favorites_unique UNIQUE (user_id, trip_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own favorites"
ON public.favorites
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
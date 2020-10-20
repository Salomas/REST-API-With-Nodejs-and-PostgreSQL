const pg = require("../database/database").pool;

exports.index = (req, res, next) => {
  pg.connect((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    } 
    pg.query("SELECT * FROM cities;", (error, resultado) => {
        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        const asJason = resultado.rows.map( city => {
          return {
          
              name: city.name,
              lon: city.lon,
              lat: city.lat,
              country: city.country,
              population: city.population,
              timezone: city.timezone,
          }
        })
    
      return res.status(200).json(asJason); 
    });
  });
};



exports.show = (req, res, next) => {
  pg.connect((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      `SELECT * FROM cities
     WHERE cities.city_id = $1`,
      [req.params.city_id],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        if (result.rows.length == 0) {
          return res.status(404).send({
            mensagem: "City not found",
          });
        }

        const asJason = result.rows.map((city) => {
          return {
            city: {
              id: city.id,
              name: city.name,

              cord: { lon: city.lon, lat: city.lat },

              country: city.country,
              population: city.population,
              timezone: city.timezone,
            }

          };
        });

        return res.status(200).json(asJason);
      }
    );
  });
};



exports.store =  (req, res, next) => {
  pg.connect((error, conn) => {
    if (error) { return res.status(500).send({error: error})
    } 
    conn.query(
      `INSERT INTO public.cities(name, lon, lat, country, population, timezone)VALUES ( $1, $2, $3, $4, $5, $6)`,
      [req.body.name, req.body.lon, req.body.lat, req.body.country, req.body.population, req.body.timezone],
      (error, resultado, field) => {
        conn.release();
        if (error) {return res.status(500).send({error: error})}
        const response = {
          
          Cities: {
            city_id: resultado.city_id,
            name: req.body.name,
            lon: req.body.lon,
            lat: req.body.lat,
            country: req.body.country,
            population: req.body.population,
            timezone: req.body.timezone,
            request: {
              type: "GET",
              descripition: "Return All Cities",
              url: "http://localhost:3333/weather",
            },
          },
        };
        res.status(201).send(response);
      }
    );
  });
};
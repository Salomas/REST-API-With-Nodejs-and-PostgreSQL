const pg = require("../database/database").pool;

exports.show = (req, res, next) => {
  pg.connect((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error,
      });
    }
    conn.query(
      `SELECT * 
    FROM forecasts
    INNER JOIN cities
    ON cities.city_id = forecasts.city_id
    INNER JOIN weather
    ON weather.weather_id = forecasts.weather_id
     WHERE cities.name = $1`,
      [req.params.city_name],
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

        const asJason = result.rows.map((forecasts) => {
          return {
            city: {
              id: forecasts.id,
              name: forecasts.name,

              cord: { lon: forecasts.lon, lat: forecasts.lat },

              country: forecasts.country,
              population: forecasts.population,
              timezone: forecasts.timezone,
            },

            list: [
              {
                dt: forecasts.dt,
                sunrise: forecasts.sunrise,
                sunset: forecasts.sunset,

                temp: {
                  day: forecasts.tempday,

                  min: forecasts.tempmin,

                  max: forecasts.tempmax,

                  night: forecasts.tempnight,

                  eve: forecasts.tempeve,

                  morn: forecasts.tempmorn,
                },

                feels_like: {
                  day: forecasts.feels_likeday,

                  night: forecasts.feels_likenight,

                  eve: forecasts.feels_likeeve,

                  morn: forecasts.feels_likemorn,
                },

                pressure: forecasts.pressure,

                humidity: forecasts.humidity,

                weather: [
                  {
                    id: forecasts.weather_id,

                    main: forecasts.main,

                    description: forecasts.description,

                    icon: forecasts.icon,
                  },
                ],

                speed: forecasts.speed,

                deg: forecasts.deg,

                clouds: forecasts.clouds,

                pop: forecasts.pop,
              },
            ],
          };
        });

        return res.status(200).json(asJason);
      }
    );
  });
};

exports.store = (req, res, next) => {
  pg.connect((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `INSERT INTO public.forecasts(
         city_id, weather_id, dt, 
         sunrise, sunset, tempday,
          tempmin, tempmax, tempnight, 
          tempeve, tempmorn, feels_likeday,
           feels_likenight, feels_likeeve, feels_likemorn, pressure, humidity, speed, deg, clouds, pop)
        VALUES ($1, $2, $3, $4, $5, $6, 7$, $8, 9$, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21);`,
        [req.params.city_id],[req.params.weather_id],
        [req.body.dt, req.body.sunrise, req.body.sunset, req.body.tempday, req.body.tempmin, req.body.tempmax, 
          req.body.tempnight, req.body.tempeve, req.body.tempmorn,
          req.body.feels_likeday, req.body.feels_likenight, req.body.feels_likeeve,
          req.body.feels_likemorn, req.body.pressure, req.body.humidity,req.body.speed, req.body.deg, req.body.clouds, req.body.pop],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          weather: {
            mensage: "add forecast successfully"
            
          },
        };
        res.status(201).send(response);
      }
    );
  });
};

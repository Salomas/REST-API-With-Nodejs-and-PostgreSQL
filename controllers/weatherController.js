const pg = require("../database/database").pool;

exports.index = (req, res, next) => {
  pg.connect((error, conn) => {
    if (error) {
      return res.status(500).send({
        error: error
      });
    } 
    pg.query("SELECT * FROM weather;", (error, resultado) => {
        if (error) {
          return res.status(500).send({
            error: error
          });
        }

        const asJason = resultado.rows.map( weather => {
          return {
              
            main: weather.main,
            description: weather.description,
            icon: weather.icon,
              
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
      `SELECT * FROM weather
     WHERE weather.weather_id = $1`,
      [req.params.weather_id],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({
            error: error,
          });
        }

        if (result.rows.length == 0) {
          return res.status(404).send({
            mensagem: "Weather not found",
          });
        }

        const asJason = result.rows.map((weather) => {
          return {
            
                weather: [
                  {
                    id: weather.weather_id,

                    main: weather.main,

                    description: weather.description,

                    icon: weather.icon,
                  },
                ],
              }
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
      `INSERT INTO public.weather(main, description, icon)VALUES ( $1, $2, $3)`,
      [req.body.main, req.body.description, req.body.icon],
      (error, resultado, field) => {
        conn.release();
        if (error) {return res.status(500).send({error: error})}
        const response = {
          
          weather: {
            id_weather: resultado.weather_id,
            main: req.body.main,
            icon: req.body.icon,
            description: req.body.description,
            request: {
              type: "GET",
              descripition: "Return All weathers",
              url: "http://localhost:3333/weather",
            },
          },
        };
        res.status(201).send(response);
      }
    );
  });
};
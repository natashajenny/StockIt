## System Architecture

Our hardware is sourced from Amazon Web Services thus ensuring a scalable and reliable cloud based performance. Main server is based on Ubuntu 18.04 LTS edition and is run on a EC2 instance. PostgreSQL database, that was selected for it's licencing terms and performance, is hosted on a separate RDS instance to ensure maximum robustness.

Front end is built around React.JS with a Material UI styling for simple and intuitive user experience. Web framework is handled by Flask, a lightweight web application framework, that features great degrees of extensibility with minimal overhead costs.

Python is used to conduct data mining, visualisation, and processing for its simplicity and a vast array of supporting libraries. Our financial data sources include AlphaVantage for daily stock ticks and MorningStar DatAnalysis platform for yearly company reports.

Stock prediction model is handled by an ensemble of neural networks built on the TensorFlow library, incorporating both technical indicators and unsupervised learning approaches in its prediction methodology.

Finally, all of the above is linked together through an SQLAlchemy ORM, that provides a convenient layer of abstraction for database entities.

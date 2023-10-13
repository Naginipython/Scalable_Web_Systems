/*export default (err, req, res, next) => {
    // If req.headerSent is true, the response has already been 
    // sent to the client. You should call next(err) to skip.
  
    // Otherwise, set the status code to the err.statusCode or 500 and
    // return the error message to the client as a json object: 
    //
    //   { error: errorMessage }
    //
    // The error message should be either err.message if set or
    // 'Internal BookStore Server Error'.
    if (req.headerSent) {
        next(err);
    } else {
        res.status(500).send({ "error": err.message })
    }
}*/
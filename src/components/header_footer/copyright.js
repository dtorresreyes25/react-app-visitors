import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="http://intranet.ict.cu">
          Internacional Cubana de Tabacos S.A.
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  };

  export default Copyright
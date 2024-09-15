import { Grid, Typography } from "@mui/material";
import helpingLogo from "../../images/Seniors/help.png";

const SeniorsIntro = () => {
    return (
        <Grid container paddingX={{ xs: "4%", md: "12%" }} paddingY={8}>
            <Grid
                item
                xs={12}
                md={8}
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}
                padding={4}
            >
                <Typography
                    color={"#002245"}
                    fontSize={"25px"}
                    textAlign={"center"}
                >
                    உயர்கல்வி மற்றும் தொழில் உலகிற்கு கால்பதிக்க காத்திருக்கும்
                    மொறட்டுவை பல்கலைக்கழக தமிழ் மாணவர்களுக்கு வழிகாட்டி
                    அவர்களுடன் கைகோர்க்கும் ஓர் களம்
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                md={4}
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}
                padding={4}
            >
                <img src={helpingLogo} alt="Seniors" />
            </Grid>
        </Grid>
    );
};

export default SeniorsIntro;

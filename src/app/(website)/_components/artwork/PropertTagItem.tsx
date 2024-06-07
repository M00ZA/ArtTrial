import { Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface IProps {
  property: string;
  value: string;
}

export default function PropertyTagItem({ property, value }: IProps) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="flex-start"
        gap="8px"
        marginBottom="8px"
        marginLeft="8px"
      >
        <CheckCircleIcon
          htmlColor="#6C63FF"
          fontSize="medium"
          sx={{ verticalAlign: "middle" }}
        />
        <Stack direction="column">
          <Typography component="p" variant="body1" fontWeight={"bold"}>
            {property}
          </Typography>
          <Typography component="p" variant="body1" fontSize={".8rem"}>
            {value}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}

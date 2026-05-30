import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { Container, Typography } from '@mui/material';

interface LogoProps {
    iconSize: string;
    textSize: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    color: string;
}

const Logo = ({ iconSize, textSize, color }: LogoProps) => {
    return (
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AutoGraphIcon sx={{ fontSize: iconSize, color: color }} />
            <Typography variant={textSize} sx={{ color: color, fontWeight: 'bold' }}>FinAnalytica</Typography>
        </Container>
    )
}

export default Logo
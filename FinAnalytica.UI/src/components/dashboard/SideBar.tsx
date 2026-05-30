import { Box, Container, Link, Typography } from '@mui/material';
import Logo from '../Logo';

const sidebarLinks = ['Dashboard', 'Reports', 'Client Data', 'Data Entry'];

const SideBar = () => {
    return (
        <>
            <Box sx={{ height: '20vh', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', margin: '0 10px' }}>
                <Logo iconSize="35px" textSize="h5" color="#ccdcdb" />
                <Typography variant="h6" sx={{ color: '#ccdcdb', marginLeft: '10px' }}>SOLUTIONS</Typography>
            </Box>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '30px', marginTop: '30px', height: '50vh' }}>
                {sidebarLinks.map((link, index) => (
                    <Link href={link === 'Dashboard' ? '/dashboard' : '/pageUnderConstruction'} color="#ccdcdb" underline="none" key={index} sx={{ fontSize: '18px', fontWeight: '400' }}>
                        {link}
                    </Link>
                ))}
            </Container>
        </>
        
    )
}

export default SideBar
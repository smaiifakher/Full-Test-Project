import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff', ...theme.typography.body2,
    padding  : theme.spacing(1),
    textAlign: 'center',
    color    : theme.palette.text.secondary,
}));

export default function App() {
    const [selectedOption, setSelectedOption] = useState('Number of humans at that time');

    const [data, setData]                 = useState([]);
    const [personData, setPersonData]     = useState([]);
    const [positionData, setPositionData] = useState([]);


    useEffect(() => {
        async function fetchPersonData() {
            const response = await fetch('http://127.0.0.1:8000/api/number');
            const json     = await response.json();
            setPersonData(json);
        }

        fetchPersonData();

    }, []);
    useEffect(() => {
        async function fetchPositionData() {
            const response = await fetch('http://127.0.0.1:8000/api/position');
            const json     = await response.json();
            setPositionData(json);
        }

        fetchPositionData();

    }, []);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'Number of humans at that time') {
            setData(personData);
        } else if (event.target.value === 'X position of human') {
            setData(positionData);
        }
    };

    return (<Box
            sx={{
                width: '100%', display: 'flex', justifyContent: 'center', padding: '32px',
            }}
        >
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={24} style={{maxWidth: '50%', textAlign: 'center'}}>
                    <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-label'>
                            selected Option
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={selectedOption}
                            label='selected Option'
                            onChange={handleChange}
                        >
                            <MenuItem value={'Number of humans at that time'}>
                                Number of humans at that time
                            </MenuItem>
                            <MenuItem value={'X position of human'}>
                                X position of human
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <br/>
                <br/>
                <Grid item xs={24} style={{maxWidth: '100%', textAlign: 'center'}}>
                    <LineChart width={800} height={300} data={data}>
                        <XAxis dataKey='datetime'/>
                        <YAxis
                            dataKey={selectedOption === 'Number of humans at that time' ? 'number' : 'average'}
                        />
                        <Tooltip/>
                        <Legend/>
                        <Line
                            type='monotone'
                            dataKey={selectedOption === 'Number of humans at that time' ? 'number' : 'average'}
                            stroke='#8884d8'
                        />
                    </LineChart>
                </Grid>
                <br/>
                <br/>
                <Grid item xs={24} style={{maxWidth: '75%', textAlign: 'center'}}>
                    <Item>3</Item>
                </Grid>
            </Grid>
        </Box>);
}

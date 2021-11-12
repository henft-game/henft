import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState, Fragment } from 'react';
import HeroCard from '../components/HeroCard';
import { Web3Context } from '../providers/Web3Provider';

const Main = () => {

    const { contract, accounts, marketAddress } = useContext(Web3Context);

    const [heroes, setHeroes] = useState();
    const [myHeroes, setMyHeroes] = useState();

    const [loading, setLoading] = useState(true);

    const [isApprovedForAll, setIsApprovedForAll] = useState(false);

    const loadHeroes = async function () {
        setHeroes(await contract.methods.getHeroes().call({ from: accounts[0] }));
    }

    const loadMyHeroes = async function () {
        setMyHeroes(await contract.methods.getMyHeroes().call({ from: accounts[0] }));
    }

    const levelUpHero = async function (heroId) {
        await contract.methods.levelUp(heroId).send({ from: accounts[0] });

        const hero = await contract.methods.getHero(heroId).call({ from: accounts[0] })

        setHeroes([...heroes.slice(0, heroId), hero, ...heroes.slice(heroId + 1)]);
    }

    const isApprovalForAll = async function () {
        setIsApprovedForAll(await contract.methods.isApprovedForAll(accounts[0], marketAddress).call({ from: accounts[0] }));
    }

    useEffect(() => {
        if (!!contract && !!accounts[0] && !!marketAddress) {
            setLoading(true);
            loadHeroes();
            loadMyHeroes();
            setLoading(false);
            isApprovalForAll();
        }
    }, [contract, accounts, marketAddress])

    return (
        <Fragment>
            <Grid container spacing={1} sx={{padding: "10px"}}>
                {!loading && !!myHeroes && !!heroes && heroes.map((hero, heroId) => {
                    return (
                        <Grid key={heroId} item xs={12} md={6} lg={4} xl={3}>
                            <HeroCard hero={hero} token={heroId}
                                ownedByMe={myHeroes.indexOf(heroId + '') > -1}
                                levelUp={levelUpHero} isApprovalForAll={isApprovalForAll} isApprovedForAll={isApprovedForAll}
                            />
                        </Grid>
                    );
                })}
            </Grid>
            
        </Fragment>
    )
}

export default Main;
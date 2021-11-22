import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState, Fragment, useRef, useCallback } from 'react';
import HeroCard from '../components/HeroCard';
import useHeroes from '../hooks/useHeroes';
import { Web3Context } from '../providers/Web3Provider';

const Heroes = () => {

    const { contract, accounts, marketAddress } = useContext(Web3Context);

    const [myHeroes, setMyHeroes] = useState([]);
    const [isApprovedForAll, setIsApprovedForAll] = useState(false);
    const [page, setPage] = useState(0);

    const { loading, heroes, hasMore } = useHeroes(page);

    const observer = useRef();
    const lastElementRef = useCallback(node => {
        if (loading) {
            return;
        }
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) {
            observer.current.observe(node);
        }
    }, [loading, hasMore]);


    const loadMyHeroes = async function () {
        setMyHeroes(await contract.methods.getMyHeroes().call({ from: accounts[0] }));
    }

    const isApprovalForAll = async function () {
        setIsApprovedForAll(await contract.methods.isApprovedForAll(accounts[0], marketAddress).call({ from: accounts[0] }));
    }

    useEffect(() => {
        if (!!contract && !!marketAddress) {
            if (!!accounts[0]) {
                loadMyHeroes();
                isApprovalForAll();
            }

            contract.events.Transfer((err, event) => {
                //loadHeroes();
            });

        }
    }, [contract, accounts, marketAddress])

    return (
        <Fragment>
            {loading && <div>loading...</div>}
            <Grid container spacing={1} sx={{ padding: "10px" }}>
                {heroes.map((hero, heroId) => {
                    return (
                        <Grid ref={heroes.length === heroId + 1 ? lastElementRef : null} key={heroId} item xs={12} md={6} lg={4} xl={3}>
                            <HeroCard heroInstance={hero} token={heroId}
                                ownedByMe={myHeroes.indexOf(heroId + '') > -1}
                                isApprovalForAll={isApprovalForAll} isApprovedForAll={isApprovedForAll}
                            />
                        </Grid>
                    );
                })}
            </Grid>

        </Fragment>
    )
}

export default Heroes;
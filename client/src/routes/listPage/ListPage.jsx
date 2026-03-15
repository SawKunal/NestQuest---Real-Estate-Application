import React, { Suspense } from 'react'
import './listPage.scss'
// import { listData } from '../../lib/dummyData'
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
import { useLoaderData, Await } from 'react-router-dom';

function ListPage() {

    const data = useLoaderData();
    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading posts!</p>
                            }
                        >
                            {(postResponse) => (
                                <>
                                    {postResponse.data.map(post => (
                                        <Card key={post.id} item={post} />
                                    ))}
                                </>
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<div>Loading...</div>}>
                    <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading Map!</p>}
                    >
                        {(postResponse) => <Map items={postResponse.data} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default ListPage
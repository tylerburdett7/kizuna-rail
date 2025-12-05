import { getAllRoutes, getListOfRegions, getListOfSeasons, getRoutesByRegion, getRoutesBySeason } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const seasons = await getListOfSeasons();
    const { region, season } = req.query;

    let routes = await getAllRoutes();

    // Filter by region or season
    if (region && region !== 'all') {
        routes = await getRoutesByRegion(region);
    }

    if (season && season !== 'all') {
        if (region && region !== 'all') {
            // Both filters
            routes = routes.filter(route => route.bestSeason.toLowerCase() === season.toLowerCase());
        } else {
            // Only season filter
            routes = await getRoutesBySeason(season);
        }
    }

    res.render('routes/list', { 
        title: 'Scenic Train Routes',
        regions,
        routes,
        seasons,
        query: { region, season }
    });
};
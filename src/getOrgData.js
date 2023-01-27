import { setOrganizationAction } from "./actions";

export const getOrganization = async (pb, dispatch) => {

    const allDocuments = await pb.collection('documents').getFullList(200 /* batch size */, {
        sort: '-created',
        expand: 'author, category, team'
    });

    const lastUpdatedDocuments = await pb.collection('documents').getList(1, 3, {
        sort: '-updated',
        expand: 'author, category, team'
    });

    const categories = await pb.collection('buckets').getFullList(200 /* batch size */, {
        sort: '+name',
    });

    const organizationData = {
        allDocuments,
        lastUpdatedDocuments: lastUpdatedDocuments.items,
        categories
    }

    console.log(organizationData)

    setOrganizationAction(dispatch, organizationData)
}
import prisma from '$lib/prisma';
import type {  RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    const userId = url.searchParams.get('userId');
    const roomCount = url.searchParams.get('roomCount');
    const guestCount = url.searchParams.get('guestCount');
    const bathroomCount = url.searchParams.get('bathroomCount');
    const locationValue = url.searchParams.get('locationValue');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const category = url.searchParams.get('category');
 
    const query: {
        userId?: string;
        category?: string;
        roomCount?: {
            gte: number;
        };
        guestCount?: {
            gte: number;
        };
        bathroomCount?: {
            gte: number;
        };
        locationValue?: string;
        NOT?: {
            reservations: {
                some: {
                    OR: [
                        {
                            endDate: {
                                gte: string;
                            };
                            startDate: {
                                lte: string;
                            };
                        },
                        {
                            startDate: {
                                lte: string;
                            };
                            endDate: {
                                gte: string;
                            };
                        }
                    ];
                };
            };
        };
    } = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (startDate && endDate) {
        query.NOT = {
          reservations: {
            some: {
              OR: [
                {
                  endDate: { gte: startDate },
                  startDate: { lte: startDate }
                },
                {
                  startDate: { lte: endDate },
                  endDate: { gte: endDate }
                }
              ]
            }
          }
        }
      }

      const listings = await prisma.listing.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc'
        }
      });

	if (!listings) {
		error(404, 'Not Found');
	}

	return json(listings);
};
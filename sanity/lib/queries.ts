import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(`
    *[
        _type == "startup" && defined(slug.current)
        && (
            !defined($search) 
            || $search == ""
            || category match $search
            || title match $search
            || description match $search
            || author->name match $search
        )
    ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    category,
    author -> {
        _id,
        name,
        image,
        bio
    },
    views,
    description,
    image
    }
`)

export const STARTUP_BY_ID_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0] {
    _id,
    title,
    slug,
    _createdAt,
    category,
    author -> {
        _id,
        name,
        image,
        bio,
        username,
        email
    },
    views,
    description,
    image,
    pitch
    }
`)

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0]{
        _id, views
    }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
`)
# bam
Better Activity Manager

## Installation

## Rest
read the readme in /rest for more info

## Requirements
- Create
- Update
- Delete
- List
- Join
- Leave
- Announce

## Event data
- Name
- Start datetime
- End datetime
- Cost
- Users
- Location
- Description
- Hosts
- Tags

The list of users is a list of `(Username, State)` where State is: `enum { Yes, No, Maybe, Invited }`

## Components

- REST Server
- iCal feed generator
    - Filters: user (state = yes/maybe), invited user (state = invited), tags
- IRC client
    - Announcements every T time
    - Info about event X
    - Creation wizard
    - Create WWW token
    - Create iCal token
    - Duplicate event
    - Remove event
    - Update event details
- WWW client
    - ID per client
- Future: Mediawiki client as a plugin

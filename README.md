# n8n Pi-hole API client

![Build](https://github.com/hugo-ma-alves/n8n-nodes-pihole/actions/workflows/build.yml/badge.svg)
[![NPM version][npm-version-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-downloads-url]

[npm-url]: https://npmjs.org/package/n8n-nodes-pihole
[npm-version-image]: https://img.shields.io/npm/v/n8n-nodes-pihole.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/n8n-nodes-pihole.svg?style=flat
[npm-downloads-url]: https://npmcharts.com/compare/n8n-nodes-pihole?minimal=true


This is an [N8n](https://n8n.io/) community node. It allows you to use the [Pi-hole](https://pi-hole.net/) API [[1]](https://discourse.pi-hole.net/t/pi-hole-api/1863),[[2]](https://github.com/pi-hole/AdminLTE/blob/master/api.php), in your workflow.

Most of the resources provided by the Pi-hole API are read only, for example the ad blocking metrics or the system status. To use these endpoints you don't need to create a credential.

However, if you plan to use the endpoints that can change the Pi-hole system status, for example disabling/enable the ad blocking, you will need to create the credential to access the API.

Please see bellow which operations are implemented by this node.

# Index

[Installation](#installation)  
[Usage](#usage)  
[Credentials](#credentials)  
[Resources/Operations](#resources)  
[Compatibility](#compatibility)  
[Developers](#developers)  

# Installation

No special requirement for this node.

Just follow the generic [installation guide](https://docs/imgs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

**NpmJs url:** https://www.npmjs.com/package/n8n-nodes-pihole

**NpmJs package name:** n8n-nodes-pihole

1. Go to **Settings > Community Nodes**, and Click **Install a community node**.
![n8n community node install](/docs/imgs/settings_community_nodes.png)
1. Enter `n8n-nodes-pihole` in **Enter npm package name** input.
![n8n community node install pihole](/docs/imgs/settings_community_pihole_node.png)
1. Click **Install**.

After installed you can use the search bar to add the Pi-hole node to your workflow.

![pihole node search n8n](/docs/imgs/pihole_search_bar.png)
![pihole n8n node](/docs/imgs/pihole_node.png)


# Usage

The node configuration is quite simple, just specify the credentials(if required for the operation you want to perform) and the API URL. 
If you are using the default Pi-hole configurations the API url is http://domain/admin/api.php. For example, http://192.168.1.125/admin/api.php.


# Credentials

Only the operations that can change the Pi-hole state require the usage of the API key. For example, if you want to disable or enable the ad blocking from n8n, you must create the credential. 
If you are only interested in "read" operations you can skip this step. 

1. First you must get the Pi-hole API key. Navigate to the Settings-> API/ Web interface, and click on the "Show API token".

![pihole settings api key](/docs/imgs/api_key_settings_page.png)

2. On the popup click on the "Yes, show API token" button.

![pihole api key popup](/docs/imgs/api_key_settings_popup.png)

3. Finally copy the api key. (Yes, this is a test key)

![pihole api key](/docs/imgs/api_key.png)

4. Back to the n8n web page, create a credential of the type "Pi-hole"

![n8n credential menu](/docs/imgs/n8n_credential_menu.png)

4. Paste and save the Pi-hole API key

![n8n credential pihole](/docs/imgs/n8n_credential_pihole.png)

# Resources

This section describes which Pi-hole API operations are available in this node. 

Please create an issue or submit PR if you are interested in implementing a new operation.

**Note:** If your Pi-hole web interface is not password protected, no credential is required!
 

| Resource          | Operation | Credentials required |
|-------------------|-----------|----------------------|
| Status            | Get       | yes                  |
|                   | Enable    | yes                  |
|                   | Disable   | yes                  |
| Summary           | Get       | yes                  |
| ApiVersion        | Get       | no                   |
| Version           | Get       | no                   |
| Type              | Get       | no                   |
| RecentBlocked     | Get       | no                   |
| TopClients        | Get       | yes                  |
| TopClientsBlocked | Get       | yes                  |

## Status

### Get - Requires credential

Returns overall status of the system.

It either returns disabled or enabled.
Example:

```json
  {
    "status": "disabled"
  }
```

### Enable - Requires credential

This operation enables the Pi-hole ad blocking.

### Disable - Requires credential

This operation disables the Pi-hole ad blocking. 

If you want to disable the ad blocking for specific amount of time, you can configure the "seconds" property. When specified it will disable the ad blocking for the specified amount of seconds.


## Summary - Requires credential

Returns the summary of the system stats.

The response of this operation contains for example the number of domains blocked or the last gravity list update date.
For example:

```json
  {
    "domains_being_blocked": "906,175",
    "dns_queries_today": "29,350",
    "ads_blocked_today": "5,053",
    "ads_percentage_today": "17.2",
    "unique_domains": "3,218",
    "queries_forwarded": "18,978",
    "queries_cached": "5,238",
    "clients_ever_seen": "9",
    "unique_clients": "9",
    "dns_queries_all_types": "29,350",
    "reply_UNKNOWN": "161",
    "reply_NODATA": "6,880",
    "reply_NXDOMAIN": "1,122",
    "reply_CNAME": "8,576",
    "reply_IP": "12,267",
    "reply_DOMAIN": "235",
    "reply_RRNAME": "0",
    "reply_SERVFAIL": "17",
    "reply_REFUSED": "0",
    "reply_NOTIMP": "0",
    "reply_OTHER": "0",
    "reply_DNSSEC": "0",
    "reply_NONE": "0",
    "reply_BLOB": "92",
    "dns_queries_all_replies": "29,350",
    "privacy_level": "0",
    "status": "disabled",
    "gravity_last_updated": {
      "file_exists": true,
      "absolute": 1664313721,
      "relative": {
        "days": 3,
        "hours": 19,
        "minutes": 10
      }
    }
  }
```

## ApiVersion

Returns the version of the API.

```json
{
  "version": 3
}
```

## Version

Returns the version for each Pi-hole component (core, web and ftl).
Also indicates if any of the components have a pending update.

```json
{
  "core_update": false,
  "web_update": false,
  "FTL_update": false,
  "core_current": "v5.12.2",
  "web_current": "v5.15.1",
  "FTL_current": "v5.18.1",
  "core_latest": "v5.12.2",
  "web_latest": "v5.15.1",
  "FTL_latest": "v5.18.1",
  "core_branch": "master",
  "web_branch": "master",
  "FTL_branch": "master"
}
```


## Type

Returns the backend used by the API (either PHP or FTL).

```json
  {
    "type": "FTL"
  }
```

## RecentBlocked

Returns the last blocked domain.

## TopClient - Requires credential

Returns the clients with the higher number of requests. 
By default it returns the first 10 clients, you can specify a different value in the additional properties.

```
[
  {
    "top_sources": {
      "DESKTOP.lan|192.168.1.245": 11057,
      "something.lan|192.168.1.102": 10707,
      "192.168.1.163": 4033,
    }
  }
]
```

## TopClientBlocked - Requires credential

Returns the clients with the higher number of blocked requests. 
By default it returns the first 10 clients, you can specify a different value in the additional properties.

```
[
  {
    "top_sources_blocked": {
      "DESKTOP.lan|192.168.1.245": 11057,
      "something.lan|192.168.1.102": 10707,
      "192.168.1.163": 4033,
    }
  }
]
```

# Compatibility

Tested on n8n version 0.193.5 and Pi-hole v5.12.2 | FTL v5.18.1 | Web Interface v5.15.1 

# Developers 

//TODO

## Requirements

The n8n development environment [tools](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

To make the development easier you can use the docker-compose.yml file to launch 2 containers, one with n8n and another with Pi-hole.

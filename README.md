# Concurrent Pixel Grid

## Table of Contents
- [Concurrent Pixel Grid](#concurrent-pixel-grid)
  * [Overview](#overview)
  * [Requirements](#requirements)
    + [Pre-requirements](#pre-requirements)
    + [Clone the repository](#clone-the-repository)
    + [Setting Up the Development Environment](#setting-up-the-development-environment)

## Overview

A real-time collaborative pixel drawing web application that allows multiple users to create pixel art together on a shared canvas. Built with React frontend and Django backend for seamless concurrent editing.

![Canvas Demo](https://github.com/shmappp/Concurrent-Pixel-Grid/blob/main/demos/canvas/test_canvas_20250529.gif)

## Requirements

### Pre-requirements

Ensure you have Docker and Docker Compose installed. You can verify by running:
```
docker --version
docker-compose version # or docker compose version
```
If these commands do not return the versions, install Docker and Docker Compose using the official documentation: [Docker](https://docs.docker.com/get-started/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Clone the repository

```
git clone https://github.com/shmappp/Concurrent-Pixel-Grid.git
cd Concurrent-Pixel-Grid
```

### Setting Up the Development Environment

1. Build the Docker image

```
docker-compose build
```

2. Start the Docker container
```
docker-compose up
```



FROM gitpod/workspace-full

USER root
RUN sudo apt-get update && apt-get install -y apt-transport-https \
 && sudo apt-get install -y \
    xserver-xorg-dev libxext-dev libxi-dev build-essential libxi-dev libglu1-mesa-dev libglew-dev pkg-config libglu1-mesa-dev freeglut3-dev mesa-common-dev \
 && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/*

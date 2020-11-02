---
name: New release checklist ✅
about: Coordinate steps to publish a new release
title: 'Checklist and coordination for v0.0.0 major/minor/patch release'
labels: release
assignees: '@publiclab/is-maintainers'
---

This template guides us through the steps of creating a new release, based on conversation and testing in [#1692](https://github.com/publiclab/image-sequencer/issues/1692).

Discuss with @publiclab/is-maintainers if anything is ambiguous!

<!-- NOTE: Change v0.0.0 to the appropriate release version -->

* [x] open an issue using the "release" template with this checklist with title `Checklist and coordination for v0.0.0 major/minor/patch release` (see [semantic versioning](https://docs.npmjs.com/about-semantic-versioning/))
* [ ] create a release [project](https://github.com/publiclab/image-sequencer/projects) from [this template](https://github.com/publiclab/image-sequencer/projects/5). You can copy a project from its menu.
* [ ] compile release notes below from corresponding [release project](https://github.com/publiclab/image-sequencer/projects).
* [ ] update version number in `examples/sw.js` (ex #1734) and `package.json` (ex #1695)
* [ ] finalize and merge to `main` branch (freeze merges to `main` branch until next step)
* [ ] merge, build and publish `/dist/` files to `stable` (merges to `main` branch can resume for next release)
* [ ] create a release on GitHub and use features description + release notes from below
* [ ] tag version number branch (i.e. `v0.0.0`)
* [ ] publish tagged branch to `npm`
* [ ] publish to live Github pages [demo](https://sequencer.publiclab.org) (with [bash script](https://github.com/publiclab/image-sequencer/pull/1703) from `/scripts/update-demo`) (from within GitPod works well)
* [ ] move anything necessary to next release project, i.e. <!-- Update this link -->https://github.com/publiclab/image-sequencer/projects/[insert project number]
* [ ] close this issue!

Noting we're now in this process in https://github.com/publiclab/image-sequencer/pull/1695 for `v3.6.0`.

****

### Release notes
Compile and edit release notes below, to be copied into the release description.

#### Added

#### Fixed

#### Changed

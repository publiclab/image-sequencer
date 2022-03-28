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
* [ ] create a release draft in https://github.com/publiclab/image-sequencer/releases
* [ ] auto-compile release notes and copy below from corresponding release draft
* [ ] open a pull request with updated version numbers
    * [ ] update version number in `package.json` (ex #1695)
    * [ ] update version number in `examples/sw.js` (ex #1734)
    * [ ] run `npm install` to update `package-lock.json` (from recent node version - 16 at time of writing, in GitPod should work)
    * [ ] check in `package-lock.json`
* [ ] finalize and merge to `main` branch (freeze merges to `main` branch until next step)

Now, move to `stable` branch:

* [ ] force push from `main` to `stable`
* [ ] then in `stable` branch, compile `dist/` files with `grunt build`
* [ ] add `dist/` files with `git add -f dist/*` and commit them to `stable` branch
* [ ] publish `stable` branch to `npm` with `npm publish` (logging in first as necessary)
* [ ] push local `stable` branch up to origin github.com/publiclab/image-sequencer.git with `git push`

Draft a release:

* [ ] [create a release on GitHub](https://github.com/publiclab/image-sequencer/releases) and reconcile with features description + release notes from below
* [ ] tag version number branch (i.e. `v0.0.0`) based on `stable` or choose `stable`
* [ ] publish to live Github pages [demo](https://sequencer.publiclab.org) (with [bash script](https://github.com/publiclab/image-sequencer/pull/1703) from `/scripts/update-demo`) (from within GitPod works well)
* [ ] move anything necessary to next release project, i.e. <!-- Update this link -->https://github.com/publiclab/image-sequencer/projects/[insert project number]
* [ ] close this issue!

Noting we're now in this process in https://github.com/publiclab/image-sequencer/issues/1751 for `v3.7.0`.

****

### Release notes
Compile and edit release notes below, to be copied into the release description.

#### Added

#### Fixed

#### Changed

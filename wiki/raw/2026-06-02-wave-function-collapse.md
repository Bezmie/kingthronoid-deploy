# WaveFunctionCollapse

Source: https://github.com/mxgmn/WaveFunctionCollapse
Author: Maxim Gumin
License: MIT

## Description

Bitmap & tilemap generation from a single example with the help of ideas from quantum mechanics.

## Algorithm

1. Read the input bitmap and count NxN patterns.
   1. (optional) Augment pattern data with rotations and reflections.
2. Create an array with the dimensions of the output (called "wave" in the source). Each element of this array represents a state of an NxN region in the output. A state of an NxN region is a superposition of NxN patterns of the input with boolean coefficients (so a state of a pixel in the output is a superposition of input colors with real coefficients). False coefficient means that the corresponding pattern is forbidden, true coefficient means that the corresponding pattern is not yet forbidden.
3. Initialize the wave in the completely unobserved state, i.e. with all the boolean coefficients being true.
4. Repeat the following steps:
   1. Observation:
      1. Find a wave element with the minimal nonzero entropy. If there is no such elements (if all elements have zero or undefined entropy) then break the cycle (4) and go to step (5).
      2. Collapse this element into a definite state according to its coefficients and the distribution of NxN patterns in the input.
   2. Propagation: propagate information gained on the previous observation step.
5. By now all the wave elements are either in a completely observed state (all the coefficients except one being zero) or in the contradictory state (all the coefficients being zero). In the first case return the output. In the second case finish the work without returning anything.

## Local Similarity

(C1) The output should contain only those NxN patterns of pixels that are present in the input.
(Weak C2) Distribution of NxN patterns in the input should be similar to the distribution of NxN patterns over a sufficiently large number of outputs.

Typical N = 3.

## Two Models

### Overlapping Model
Learns NxN patterns from a single example bitmap. Output contains only patterns present in input. Varying N controls similarity to input.

### Simple Tiled Model
Tiles + adjacency data. Propagation = adjacency constraint propagation. Symmetry system for tiles (dihedral group D4) shortens adjacency enumeration.

## Key Ideas

- Minimal entropy heuristic: choose unobserved region with lowest Shannon entropy. Removes directional bias, defined for irregular grids, suited for pre-constrained problems.
- Propagation uses AC-4 algorithm (Mohr & Henderson, 1986).
- Contradiction possible (all coefficients = 0) -- problem is NP-hard. In practice, contradictions are rare.
- Constrained synthesis: WFC supports constraints, can autocomplete levels started by a human, or combine with other generative algorithms.
- Higher dimensions: same algorithm, performance becomes an issue. 3D voxel models possible.
- Overlapping model relates to tiled model as higher-order Markov chains relate to order-one Markov chains.
- One dimension can be time: d-dimensional WFC captures behaviour of any (d-1)-dimensional cellular automata.

## Used Work

1. Efros & Leung, Texture Synthesis by Non-parametric Sampling, 1999
2. Merrell, Model Synthesis, 2009 -- AC-3 adjacency constraints, lowest entropy heuristic generalization
3. Mackworth, Consistency in Networks of Relations, 1977 -- CSP formulation
4. Harrison, Image Texture Tools, 2005 -- adjacency data via border labels, backtracking search

## Notable Implementations

C++, Python, Kotlin, Rust, Julia, Go, Haxe, Java, Clojure, Dart, JavaScript. Unity, Unreal Engine 5, Godot 4, Houdini.

## Games Using WFC

Bad North, Caves of Qud, Townscaper, Matrix Awakens, Dead Static Drive.

## Related Algorithms

- ConvChain: satisfies strong C2 but not C1. Strategy: ConvChain first for sampling, then WFC to correct local defects.
- Paul Harrison's texture synthesis: faster but poor long correlations. Strategy: WFC for blueprint, then constrained texture synthesis.
- MarkovJunior: 3D simple tiled model with many tilesets.

## Comments

- WFC is a texture synthesis algorithm that guarantees output contains only input patterns
- Propagation similar to loopy belief propagation, but constraint propagation with saved stationary distribution is faster on CPU
- Easy tilesets (all tiles always placeable) don't produce interesting global arrangements -- correlations fall off quickly
- Non-Wang tilesets: Circuit, Summer, Rooms -- adjacency not induced from edge labels

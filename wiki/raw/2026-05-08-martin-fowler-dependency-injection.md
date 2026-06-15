# Inversion of Control Containers and the Dependency Injection pattern

Source: https://martinfowler.com/articles/injection.html
Author: Martin Fowler
Date: 2004-01-23

## Summary

Core problem: how to assemble plugins into an application so that application code is independent of concrete implementations.

### Key Concepts

**Plugin pattern**: Implementation class not linked at compile time. Plugged in later, out of component writer's control. (Ref: P of EAA, Fowler)

**Inversion of Control**: Too generic a term. Frameworks invert control by definition. The specific inversion here: how a component looks up a plugin implementation. Fowler renames this to "Dependency Injection" for clarity.

**Three forms of Dependency Injection**:
1. Constructor Injection (PicoContainer) -- dependencies via constructor parameters. Preferred. Creates valid objects at construction time. Immutable fields possible (no setter needed).
2. Setter Injection (Spring) -- dependencies via setter methods. Useful when many dependencies, optional dependencies, or multiple construction variants.
3. Interface Injection -- component implements injection interface. Most invasive. Requires dedicated interfaces per dependency. Avalon used this.

**Service Locator**: Alternative to DI. Object that knows how to get all services. Application asks locator explicitly. Dependency on locator itself, but straightforward behavior. Two variants: static (methods per service) and dynamic (map-based, string keys).

**DI vs Service Locator**:
- Both decouple from concrete implementation
- DI: no explicit request, service "appears" in class (inversion of control)
- Locator: explicit request via locator API
- For application classes: roughly equivalent, locator slightly simpler
- For components used across applications: DI better -- no dependency on specific locator
- Testing: both work if designed for substitutability
- DI makes dependencies visible (constructor/setter signatures)
- Locator hides dependencies in code (must search for locator calls)

**Constructor vs Setter injection**:
- Constructor: valid objects from birth, immutable fields, clear dependencies
- Setter: messy with many params, optional deps, multiple construction paths, named parameters
- Recommendation: start with constructor, switch to setter when problems arise

**Code vs Configuration files**:
- Config files for multi-deployment apps
- Code for simple apps or complex conditional assembly
- Over-eagerness for config files is a problem
- Always provide programmatic interface, config file as optional

**The fundamental principle**: Separating configuration from use. More important than the choice between DI and Locator. Analogous to separating interface from implementation. Configuration decides which class; use relies on polymorphism.

### Relevance to Project

- EventBus + WidgetRegistry in kingthronoid = manual wiring in main.ts
- Plugin pattern = same problem: how to substitute implementations
- "Separating configuration from use" = universal architectural principle
- Constructor injection preference aligns with project's approach (init functions receive dependencies)

### Cross-references

- [[component-pattern]] -- components as pluggable units
- [[observer-pattern]] -- event-based decoupling (complementary to DI)
- [[ecs-lite-architecture]] -- project architecture, manual wiring
- [[functional-programming-in-js]] -- pure functions, no side effects (complementary concern)

### Not Relevant

- Java-specific: PicoContainer, Spring XML, Avalon
- Enterprise Java context (EJB, J2EE)

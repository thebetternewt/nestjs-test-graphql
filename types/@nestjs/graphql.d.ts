export function Args(propertyOrOptions: any, pipes: any): any;
export const CONTEXT: symbol;
export function Context(property: any, pipes: any): any;
export function DelegateProperty(propertyName: any, typeFunc: any, options: any): any;
export class GqlArgumentsHost {
  static create(host: any): any;
  getArgByIndex(index: any): any;
  getArgs(): any;
  getClass(): any;
  getHandler(): any;
  switchToHttp(): any;
  switchToRpc(): any;
  switchToWs(): any;
}
export class GqlExecutionContext {
  static create(context: any): any;
  getArgByIndex(index: any): any;
  getArgs(): any;
  getClass(): any;
  getHandler(): any;
  switchToHttp(): any;
  switchToRpc(): any;
  switchToWs(): any;
}
export class GraphQLAstExplorer {
  root: any;
  addClassOrInterface(tsFile: any, mode: any, options: any): any;
  addEnumDefinition(item: any, tsFile: any): void;
  addExtendInterfaces(interfaces: any, parentRef: any): void;
  addImplementsInterfaces(interfaces: any, parentRef: any): void;
  addObjectTypeDefinition(item: any, tsFile: any, mode: any): void;
  addScalarDefinition(item: any, tsFile: any): void;
  addSymbolIfRoot(name: any): any;
  addUnionDefinition(item: any, tsFile: any): void;
  explore(documentNode: any, outputPath: any, mode: any): any;
  getClassOrInterface(tsFile: any, mode: any, name: any): any;
  getDefaultTypes(): any;
  getFieldTypeDefinition(type: any): any;
  getFunctionParameters(inputs: any): any;
  getNestedType(type: any): any;
  getType(typeName: any): any;
  isRoot(name: any): any;
  lookupDefinition(item: any, tsFile: any, mode: any): any;
  lookupField(item: any, parentRef: any, mode: any, ...args: any[]): void;
  lookupFieldDefiniton(item: any, parentRef: any, mode: any): any;
  lookupRootSchemaDefinition(operationTypes: any, tsFile: any, mode: any): void;
}
export class GraphQLDefinitionsFactory {
  gqlAstExplorer: any;
  gqlTypesLoader: any;
  exploreAndEmit(typePaths: any, path: any, outputAs: any, isDebugEnabled: any): any;
  generate(options: any): any;
  printMessage(text: any, isEnabled: any): void;
}
export class GraphQLFactory {
  constructor(resolversExplorerService: any, delegatesExplorerService: any, scalarsExplorerService: any, graphqlAstExplorer: any, gqlSchemaBuilder: any);
  resolversExplorerService: any;
  delegatesExplorerService: any;
  scalarsExplorerService: any;
  graphqlAstExplorer: any;
  gqlSchemaBuilder: any;
  createDelegates(): any;
  generateDefinitions(typeDefs: any, options: any): any;
  mergeOptions(options: any): any;
}
export class GraphQLModule {
  static createAsyncOptionsProvider(options: any): any;
  static createAsyncProviders(options: any): any;
  static forRoot(options: any): any;
  static forRootAsync(options: any): any;
  constructor(httpAdapterHost: any, options: any, graphqlFactory: any, graphqlTypesLoader: any);
  httpAdapterHost: any;
  options: any;
  graphqlFactory: any;
  graphqlTypesLoader: any;
  onModuleInit(): any;
}
export class GraphQLTypesLoader {
  getTypesFromPaths(paths: any): any;
  mergeTypesByPaths(paths: any): any;
}
export function Info(pipes: any): any;
export function Mutation(nameOrType: any, options: any): any;
export function Parent(data: any): void;
export function Query(nameOrType: any, options: any): any;
export function ResolveProperty(propertyName: any, typeFunc: any, options: any): any;
export function Resolver(nameOrType: any, options: any): any;
export function Root(data: any): void;
export function Scalar(name: any, typeFunc: any): any;
export function Subscription(nameOrType: any, options: any): any;

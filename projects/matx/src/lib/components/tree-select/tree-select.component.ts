/*

a non-critical reviewed adoption from https://material.angular.io/components/tree/overview

*/

import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ChecklistDatabase } from './ChecklistDatabase';
import { ItemFlatNode } from './ItemFlatNode';
import { ItemNode } from './ItemNode';

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  providers: [ChecklistDatabase],
})
export class TreeSelectComponent implements OnInit {
  constructor(private database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<ItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  //#region API component
  _treeData: any = {};

  @Input()
  multiSelect = true;

  @Input()
  set treeData(treeData) {
    this.resetListSelection();
    this.database.initialize(treeData);
  }

  get treeData() {
    return this._treeData;
  }

  // TODO
  allowAddItem = false;

  @Output()
  selectedItems: EventEmitter<SelectionModel<ItemFlatNode>> = new EventEmitter<
    SelectionModel<ItemFlatNode>
  >();

  //#endregion

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<ItemFlatNode, ItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<ItemNode, ItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: ItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';
  treeControl: FlatTreeControl<ItemFlatNode>;
  treeFlattener: MatTreeFlattener<ItemNode, ItemFlatNode>;
  dataSource: MatTreeFlatDataSource<ItemNode, ItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ItemFlatNode>(this.multiSelect);

  ngOnInit(): void {
    this.database.dataChange.subscribe((data) => {
      this.dataSource.data = data;
      if (this.treeControl.dataNodes.length > 0) {
        this.treeControl.expand(this.treeControl.dataNodes[0]);
      }
    });
  }

  getLevel = (node: ItemFlatNode) => node.level;
  isExpandable = (node: ItemFlatNode) => node.expandable;
  getChildren = (node: ItemNode): ItemNode[] => node.children;
  hasChild = (_: number, _nodeData: ItemFlatNode) => _nodeData.expandable;
  hasNoContent = (_: number, _nodeData: ItemFlatNode) => _nodeData.item === '';

  resetListSelection() {
    this.checklistSelection = new SelectionModel<ItemFlatNode>(
      this.multiSelect
    );
  }

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: ItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.item
        ? existingNode
        : new ItemFlatNode();
    flatNode.item = node.item;
    flatNode.childrenCount = node.children ? node.children.length : 0;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  descendantsAllSelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => this.checklistSelection.isSelected(child));
    return descAllSelected;
  }

  descendantsPartiallySelected(node: ItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some((child) =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the item selection. Select/deselect all the descendants node */
  itemSelectionToggle(node: ItemFlatNode): void {
    // console.log('itemSelectionToggle');
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.forEach((child) => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf item selection. Check all the parents to see if they changed */
  leafItemSelectionToggle(node: ItemFlatNode): void {
    if (!this.multiSelect) {
      this.resetListSelection();
    }
    this.checklistSelection.toggle(node);
    if (this.multiSelect) {
      this.checkAllParentsSelection(node);
    } else {
      this.selectedItems.emit(this.checklistSelection);
    }
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: ItemFlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.database.insertItem(parentNode!, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: ItemFlatNode, itemValue: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.database.updateItem(nestedNode!, itemValue);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  private checkAllParentsSelection(node: ItemFlatNode): void {
    // console.log('checkAllParentsSelection');
    let parent: ItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
    // emit
    this.selectedItems.emit(this.checklistSelection);
  }

  /** Check root node checked state and change it accordingly */
  private checkRootNodeSelection(node: ItemFlatNode): void {
    // console.log('checkRootNodeSelection');
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every((child) => this.checklistSelection.isSelected(child));
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  private getParentNode(node: ItemFlatNode): ItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}

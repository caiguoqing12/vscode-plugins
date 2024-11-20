// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('Write.ReactTsx', () => {
		// vscode窗口对象
		const global = vscode.window;
		// vscode 当前编辑的页面对象
		const editor: any = global.activeTextEditor;
		// 当前选中的文件
		if (!editor) {
			return;
		}
		const fileName = editor?.document.fileName;
    const files = fileName.split('/');
    let componentName = files[files?.length - 1];
    componentName = componentName.split('.')[0];
    if (componentName === 'index' && files?.[files?.length - 2]) {
      componentName = files?.[files?.length - 2];
    }
    global.showInformationMessage(componentName);

		fs.writeFileSync(fileName,
`import React, { useState, useEffect } from 'react';

interface Props {}

const ${componentName}: React.FC<Props> = ({}) => {
  return (
    <div className="container"></div>
  );
}

export default ${componentName};
      
`);

		global.showInformationMessage('Success from writeConsole!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};

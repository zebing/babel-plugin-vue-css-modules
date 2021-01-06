export const solveObjectAttribute = () => {
  { path, types, stylesId, styleName }
}

export const solveJSXAttribute = ({ path, types, stylesId, styleName }) => {
  // 默认 styleName
  if (styleName === 'class') {
    path.get('value').replaceWith(
      types.jsxExpressionContainer(
        types.logicalExpression(
          '||',
          types.memberExpression(
            stylesId,
            types.identifier(path.node.value.value),
          ),
          types.stringLiteral(propertyName.name)
        )
      )
    )
    return;
  }

  // 查找class属性
  const classNode = path.container.find((node, index) => {
    if (node.name.name === 'class') {
      node.index = index;
      return true;
    }
    return false;
  });

  // class 属性不存在
  if (!classNode) {
    const attribute = types.jsxAttribute(
      types.jSXIdentifier('class'),
      types.jsxExpressionContainer(
        types.memberExpression(
          stylesId,
          types.identifier(path.node.value.value)
        )
      )
    );

    path.container.push(attribute);
    path.remove();
    return;
  }

  // class属性值是字符串
  if (types.isStringLiteral(classNode.value)) {
    const value = types.jsxExpressionContainer(
      resolveStringValue({
        types, 
        classAttribute: classNode,
        classAttributeValue: classNode.value, 
        styleNamePathValue: path.node.value, 
        stylesId 
      })
    );
    classNode.value = value;

    // class属性值是jsx表达式
  } else if (types.isJSXExpressionContainer(classNode.value)) {
    solveMultipleValue({
      styleNamePathValue: path.node.value,
      classAttributeValue: classNode.value,
      classAttribute: classNode,
      types,
      stylesId
    });
  }
  path.remove();
}

// 处理不同类型表达式的值， 对象， 数组，字符串...
function solveMultipleValue ({
  styleNamePathValue,
  classAttribute,
  classAttributeValue,
  types,
  stylesId
}) {
  const expression = classAttributeValue.expression;

  // 对象表达式
  if (types.isObjectExpression(expression)) {
    const property = types.objectProperty(
      types.logicalExpression(
        '||',
        types.memberExpression(
          stylesId,
          types.identifier(styleNamePathValue.value)
        ),
        styleNamePathValue
      ),
      types.booleanLiteral(true),
      true
    );
      
    expression.properties.push(property);
    
    // 数组表达式
  } else if(types.isArrayExpression(expression)) {
    expression.elements.push(styleNamePathValue);

    // 其他，权当字符串看待
  } else {
    const value = types.jsxExpressionContainer(
      resolveStringValue({ 
        types, 
        classAttributeValue: expression, 
        styleNamePathValue, 
        stylesId 
      })
    );
    classAttribute.value = value;
  }
}

// 获取字符串拼接表达式
function resolveStringValue ({ types, classAttributeValue, styleNamePathValue, stylesId }) {
  return types.binaryExpression(
    '+', 
    types.binaryExpression(
      '+',
      classAttributeValue,
      types.stringLiteral(' ')
    ),
    types.logicalExpression(
      '||',
      types.memberExpression(
        stylesId,
        types.identifier(styleNamePathValue.value)
      ),
      styleNamePathValue
    )
  )
}
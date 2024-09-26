public class CountOfNodes {
    public static void main(String[] args) {
        //consider -1 as null
        int nodes[] = {1, 2, 4, -1, -1, 5, -1, -1, 3, -1, 6, -1, -1};
        BinaryTree tree = new BinaryTree();

        //create binary tree
        Node root = tree.buildTree(nodes);
        System.out.println(root.data);

        //count of nodes
        System.out.println(tree.countOfNodes(root));
    }
}

class Node {
    int data;
    Node left;
    Node right;

    public Node(int data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    int idx = -1;
    public Node buildTree(int[] nodes) {
        idx++;
        if(nodes[idx] == -1) {
            return null;
        }

        Node newNode = new Node(nodes[idx]);
        newNode.left = buildTree(nodes);
        newNode.right = buildTree(nodes);

        return newNode;
    }

    public int countOfNodes(Node root) {
        if(root == null) return 0;

        int leftNodes = countOfNodes(root.left);
        int rightNodes = countOfNodes(root.right);

       return leftNodes + rightNodes + 1;
    }
}

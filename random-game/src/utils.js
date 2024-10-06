export function rotateMatrix(matrix) {
    const n = matrix.length;
    const rotatedMatrix = [];
    for (let i = 0; i < n; i++) {
        rotatedMatrix[i] = []
        for (let j = 0; j < n; j++) {
            rotatedMatrix[i][j] = matrix[n - j - 1][i]
        }
    }
    return rotatedMatrix;
}